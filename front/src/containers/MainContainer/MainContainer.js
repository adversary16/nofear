import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { connectionStates } from "../../const";
import connectSocket from "../../redux/slices/callStateSlice.reducers/connectSocket";
import ConnectingContainer from "../ConnectingContainer/ConnectingContainer";
import IdleContainer from "../IdleContainer/IdleContainer";

const MainContainer = (props) => {
    const dispatch = useDispatch();
    const { state: connectionState } = useSelector( state => state.connection );

    switch (connectionState) {
        case connectionStates.offline:
            return <ConnectingContainer/>
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