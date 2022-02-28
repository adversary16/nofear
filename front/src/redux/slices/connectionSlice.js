import { createSlice } from "@reduxjs/toolkit";
import { callStates, connectionStates, RTCStates } from "../../const";
import setCallState from "./callStateSlice.reducers/setCallState";
import setConnectionState from "./callStateSlice.reducers/setConnectionState";

const connectionSlice = createSlice({
    name: 'callState',
    initialState: {
        socketState: connectionStates.offline,
        callState: callStates.idle,
        isSomeoneInQueue: false,
        webRTC: {
            state: RTCStates.idle,
            callId: undefined
        }
    },
    reducers: {
        updateState: setConnectionState,
        updateCallState: setCallState,
        updateQueue: (state, data) => { 
            state.isSomeoneInQueue = data.payload
        },
        setRtcState: (state, data) => {state.webRTC = data.payload}
    }
})

export const { 
    connect,
    updateState,
    updateCallState,
    updateQueue,
    setRtcState
} = connectionSlice.actions;
export default connectionSlice.reducer