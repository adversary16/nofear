import { callStates } from "../../../const"

const setCallState = (state, update, cb) => {
    if (Object.values(callStates).includes(update.payload)) {
        state.callState = update.payload;
        if (cb && typeof(cb) === 'function' ) cb()
    } else {
        throw new Error('No such state')
    }
}

export default setCallState