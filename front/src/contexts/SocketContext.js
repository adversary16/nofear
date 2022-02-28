import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'

import { callStates, connectionStates, RTCStates, socketPath } from '../const';
import { CALL_EXPECT, CALL_INITIATE, QUEUE_UPDATE } from "../const/socketMessages";
import { setRtcState, updateCallState, updateQueue, updateState } from "../redux/slices/connectionSlice";

export const SocketContext = React.createContext();


function connect() {
    return io({
        path: socketPath,
        transports: ['websocket'],
        autoConnect: false
    });
}


export const SocketContextProvider = ({children})  => {

    const dispatch = useDispatch();
    const { socketState: connectionState } = useSelector( state => state.connection );
    const [ activeSocket, setActiveSocket ] = useState(null);
    const socket = connect();
    
    socket.on('connect', () => {
        setActiveSocket(socket);
        dispatch(updateState(connectionStates.online))
    });

    socket.on('disconnect', () => {
        setActiveSocket(null);
        dispatch(updateState(connectionStates.offline))
    });

    socket.on(QUEUE_UPDATE, ({isSomeoneInQueue}) => {
        dispatch(updateQueue(isSomeoneInQueue))
    });

    socket.on(CALL_INITIATE, (callId) => {
        dispatch(updateCallState(callStates.connecting))
        dispatch(setRtcState({state: RTCStates.invoked, callId}))
    })

    socket.on(CALL_EXPECT, (callId) => {
        dispatch(updateCallState(callStates.connecting))
        dispatch(setRtcState({state: RTCStates.waiting, callId}))
    })

    const value = {
        socket: activeSocket
    }

    useEffect(() => {
        if (![connectionStates.busy, connectionStates.online].includes(connectionState)) {
            socket.connect()
        }
    }
    , [ connectionState ])
    return <SocketContext.Provider {...{value}}>
        {children}
    </SocketContext.Provider>
}

