import { useContext, useEffect } from "react"
import { useSelector } from "react-redux";
import CallButton from "../../components/CallButton/CallButton"
import { callStates } from "../../const";
import { WebRTCContext } from "../../contexts/WebRTCContext"

const IdleContainer = (props) => {
    const { actions } = useContext(WebRTCContext);
    const { requestCall } = actions;

    const { callState, isSomeoneInQueue } = useSelector(state => state.connection);

    useEffect(() => {
        console.log(isSomeoneInQueue)
    }, [isSomeoneInQueue])
    return <>
    <CallButton
        onClick={
            callState === callStates.idle ? requestCall : () => {}
        }
    />
    {
        isSomeoneInQueue && <CallButton
            caption='pick a call'
        />
    }
    </>
}

export default IdleContainer