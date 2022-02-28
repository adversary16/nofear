import { io } from 'socket.io-client'
import { socketPath } from '../../../const';

const connectSocket = (state) => {
    const socket = io({
        path: socketPath
    });
    if (socket) {
        state.socket = socket
    } else {
        console.error('connetion failed')
    }
    return state
}

export default connectSocket