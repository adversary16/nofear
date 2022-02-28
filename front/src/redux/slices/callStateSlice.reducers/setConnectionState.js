import { connectionStates } from "../../../const"

const setConnectionState = (state, update, cb) => {
    if (Object.values(connectionStates).includes(update.payload)) {
        state.socketState = update.payload;
        if (cb && typeof(cb) === 'function' ) cb()
    } else {
        throw new Error('No such state')
    }
}

export default setConnectionState