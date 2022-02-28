import { createSlice } from "@reduxjs/toolkit";
import { connectionStates } from "../../const";
import connectSocket from "./callStateSlice.reducers/connectSocket";
import setConnectionState from "./callStateSlice.reducers/setConnectionState";

const connectionSlice = createSlice({
    name: 'callState',
    initialState: {
        state: connectionStates.offline,
        socket: null,
    },
    reducers: {
        updateState: setConnectionState,
        connect: connectSocket
    }
})

export const { connect, updateState } = connectionSlice.actions;
export default connectionSlice.reducer