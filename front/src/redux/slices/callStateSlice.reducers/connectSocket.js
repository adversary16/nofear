import { io } from 'socket.io-client'
import { connectionStates, socketPath } from '../../../const';

const connectSocket = (state) => {
    const socket = io({
        path: socketPath,
        transports: ['websocket']
    });
    if (socket) {
        state.state = connectionStates.online;
        return socket
    } else {
        console.error('connetion failed')
    }
}

export default connectSocket