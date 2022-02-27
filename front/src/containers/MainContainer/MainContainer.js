import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { connectionStates } from "../../const";
import connectSocket from "../../redux/slices/callStateSlice.reducers/connectSocket";

const MainContainer = (props) => {
    const dispatch = useDispatch();
    const { state: connectionState } = useSelector( state => state.connection );

    switch (connectionState) {
        case connectionStates.offline:
            return <div>offline</div>
        case connectionStates.online:
            return <div>online</div>
        case connectionStates.busy:
            return <div>busy</div>
        case connectionStates.error:
            return <div>error</div>
        default:
            return <div> onlune </div>
    }
}

export default MainContainer