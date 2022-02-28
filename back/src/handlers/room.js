const requesterPool = new Set();
const activeCalls = new Map();


const onConnected = () => {
    return { isSomeoneInQueue: Boolean(requesterPool.size)}
}

function onCallRequest () {
    if (requesterPool.size === 0) {
        console.log(onConnected())
        this.broadcast.emit('queue_update', onConnected())
    }
    requesterPool.add(this.client.id);
    console.log({requesterPool})

}

function onCallAccept () {
    if (requesterPool.size) {
        const {value: requester} = requesterPool.values().next();
        requesterPool.delete(requester);
        activeCalls.set(this.client.id, requester)
        this.emit('call_initiate', requester);
    }
}

function onCallDecline () {
    requesterPool.delete(this.client.id)
}


function onDisconnect () {
    requesterPool.delete(this.client.id)
    console.log(this.client.id, 'disco')
}

const roomRoutes = {
    onConnected,
    call_request: onCallRequest,
    call_accept: onCallAccept,
    disconnect: onDisconnect
}

module.exports = roomRoutes