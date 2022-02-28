import { createSlice } from "@reduxjs/toolkit";
import { callStates, connectionStates } from "../../const";
import setCallState from "./callStateSlice.reducers/setCallState";
import setConnectionState from "./callStateSlice.reducers/setConnectionState";

const connectionSlice = createSlice({
    name: 'callState',
    initialState: {
        socketState: connectionStates.offline,
        callState: callStates.idle,
        isSomeoneInQueue: false,
    },
    reducers: {
        updateState: setConnectionState,
        updateCallState: setCallState,
        updateQueue: (state, data) => { 
            state.isSomeoneInQueue = data.payload
        }
    }
})

export const { connect, updateState, updateCallState, updateQueue } = connectionSlice.actions;
export default connectionSlice.reducer