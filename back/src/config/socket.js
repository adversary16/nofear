const  { Server } = require('socket.io');
const { SOCKET_PORT } = require("../const");

const io = new Server(SOCKET_PORT, {
    path: '/ws/'
});

io.on('connection', () => {
    console.log('connected')
});

module.exports = io