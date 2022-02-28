import React, { Children, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callStates, RTCStates } from '../const';
import { CALL_ACCEPT, CALL_INITIATE, CALL_REQUEST, WEBRTC_OFFER } from '../const/socketMessages';
import { updateCallState } from '../redux/slices/connectionSlice';
import { SocketContext } from './SocketContext';

export const WebRTCContext = React.createContext();

export const WebRTCProvider = ({children}) => {
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext)
    const { webRTC } = useSelector(state => state.connection);

    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);

    const requestCall = () => {
        socket.emit(CALL_REQUEST);
        dispatch(updateCallState(callStates.requested));
    }

    const acceptCall = () => {
        socket.emit(CALL_ACCEPT);
    }

    const actions = {
        requestCall,
        acceptCall
    }

    useEffect(async () => {

        if ([RTCStates.invoked, RTCStates.waiting].includes(webRTC.state)) {
            if (peerConnection) {
                peerConnection.close()
            }
            const conn = new RTCPeerConnection();    

            conn.addEventListener('icecandidate', (e) => {console.log(e)});
            setPeerConnection(conn);
        }


        if (webRTC.state === RTCStates.invoked) {
            socket.emit(WEBRTC_OFFER, localDescription, webRTC.callId)
        }

        if (webRTC.state === RTCStates.waiting) {
            socket.on('offer', (offer) => {
                peerConnection.setRemoteDescription(offer);
            })
        }

    }, [webRTC.state])

    useEffect(async () => {
        if (!peerConnection) return;
        const local = await navigator.mediaDevices.getUserMedia({audio: true});
        setLocalStream(local);

    }, [peerConnection])
    return <WebRTCContext.Provider value={{actions}}>
        {children}
    </WebRTCContext.Provider>
}
