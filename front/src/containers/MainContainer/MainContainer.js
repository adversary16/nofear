import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { connectionStates } from "../../const";
import {SocketContextProvider} from "../../contexts/SocketContext";
import { connect } from "../../redux/slices/connectionSlice";
import ConnectingContainer from "../ConnectingContainer/ConnectingContainer";
import IdleContainer from "../IdleContainer/IdleContainer";

const MainContainer = (props) => {
    const dispatch = useDispatch();
    const { state: connectionState } = useSelector( state => state.connection );

    useEffect(() => {
        console.log({connectionState})
    }, [connectionState])

    switch (connectionState) {
        case connectionStates.offline:
            return <ConnectingContainer/>
        case connectionStates.online:
            return <IdleContainer/>
        case connectionStates.busy:
            return <div>busy</div>
        case connectionStates.error:
            return <div>error</div>
        default:
            return <div> onlune </div>
    }
}

export default MainContainer