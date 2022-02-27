import { connectionStates } from "../../../const"

const setConnectionState = (state, update, cb) => {
    if (connectionStates.values.includes(update)) {
        state.connectionState = update;
        if (cb && typeof(cb) === 'function' ) cb()
        return state;
    } else {
        throw new Error('No such state')
    }
}

export default setConnectionState