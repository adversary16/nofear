import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'

import { connectionStates, socketPath } from '../const';
import { updateState } from "../redux/slices/connectionSlice";

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
    const { state: connectionState } = useSelector( state => state.connection );
    const socket = connect();
    
    socket.on('connect', () => {
        dispatch(updateState(connectionStates.online))
    });
    socket.on('disconnect', () => {
        dispatch(updateState(connectionStates.offline))
    })

    const value = {
        socket
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

