import { io } from 'socket.io-client'

const connectSocket = (state) => {
    const socket = io();
    if (socket) {
        state.socket = socket
    } else {
        console.error('connetion failed')
    }
    return state
}

export default connectSocket