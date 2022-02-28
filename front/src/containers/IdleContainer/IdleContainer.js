import { useContext } from "react"
import { useSelector } from "react-redux";
import CallButton from "../../components/CallButton/CallButton"
import { callStates } from "../../const";
import { WebRTCContext } from "../../contexts/WebRTCContext"

const IdleContainer = (props) => {
    const { actions } = useContext(WebRTCContext);
    const { requestCall, acceptCall } = actions;

    const { callState, isSomeoneInQueue } = useSelector(state => state.connection);

    return <>
    <CallButton
        onClick={
            callState === callStates.idle ? requestCall : () => {}
        }
    />
    {
        isSomeoneInQueue && 
        <CallButton
            caption='pick a call'
            onClick={
                acceptCall
            }
        />
    }
    </>
}

export default IdleContainer