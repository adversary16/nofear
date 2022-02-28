const  { Server } = require('socket.io');
const { SOCKET_PORT } = require("../const");

const io = new Server();

io.on('connection', () => {
    console.log('connected')
});

const init = () => {
    io.listen(SOCKET_PORT);
    console.info('server started on port', SOCKET_PORT)
};

module.exports = init