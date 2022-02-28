import React, { Children, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { callStates } from '../const';
import { CALL_REQUEST } from '../const/socketMessages';
import { updateCallState } from '../redux/slices/connectionSlice';
import { SocketContext } from './SocketContext';

export const WebRTCContext = React.createContext();

export const WebRTCProvider = ({children}) => {
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext)

    const requestCall = () => {
        socket.emit(CALL_REQUEST);
        dispatch(updateCallState(callStates.requested));
    }

    const actions = {
        requestCall
    }
    return <WebRTCContext.Provider value={{actions}}>
        {children}
    </WebRTCContext.Provider>
}
