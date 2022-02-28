import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import BlinkLoader from "../../components/BlinkLoader/BlinkLoader";
import { callStates, connectionStates } from "../../const";
import {SocketContextProvider} from "../../contexts/SocketContext";
import { connect } from "../../redux/slices/connectionSlice";
import ConnectingContainer from "../ConnectingContainer/ConnectingContainer";
import IdleContainer from "../IdleContainer/IdleContainer";

const CallContainer = ({ callState }) => {
    switch (callState) {
        case callStates.idle:
            return <IdleContainer/>
        case callStates.connecting:
            return <BlinkLoader caption='please wait'/>
        case callStates.ready: 
            return <div>call ready</div>
        default: 
            return <IdleContainer/>
    }
}

const MainContainer = (props) => {
    const { socketState: connectionState, callState } = useSelector( state => state.connection );
    switch (connectionState) {
        case connectionStates.offline:
            return <ConnectingContainer/>
        case connectionStates.online:
            return <CallContainer {...{callState}}/>
        case connectionStates.error:
            return <div>error</div>
        default:
            return <div> onlune </div>
    }
}

export default MainContainer