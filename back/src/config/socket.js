const  { Server } = require('socket.io');
const { SOCKET_PORT } = require("../const");
const roomRoutes = require('../handlers/room');

const appendRoutes = (socket, routes) => {
    Object.entries(routes).map(([path, handler]) => {
        socket.on(path, handler)
    })
}

const init = () => {
    const io = new Server(SOCKET_PORT, {
        path: '/ws/'
    });
    
    io.on('connection', (socket) => {
        socket.emit('queue_update', roomRoutes.onConnected());
        appendRoutes(socket, roomRoutes);
    });
    return io;
}

module.exports = init