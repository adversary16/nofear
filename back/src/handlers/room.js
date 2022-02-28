const { v4 } = require('uuid')

const requesterPool = new Map();
const activeCalls = new Map();


const onConnected = () => {
    console.log({requesterPool})
    return { isSomeoneInQueue: Boolean(requesterPool.size)}
}

function onCallRequest () {
    const clientSideId = this.client.sockets.keys().next().value
    requesterPool.set(this.client.id, clientSideId);
    this.broadcast.emit('queue_update', onConnected())
}

function onCallAccept () {
    if (requesterPool.size) {
        const [remotePartyId, localPartyId] = requesterPool.entries().next().value;
        const localClientId = this.client.sockets.keys().next().value;

        requesterPool.delete(localPartyId);
        const callId = v4();
        this.emit('call_initiate', callId);
        this.broadcast.to(localPartyId).emit('call_expect', callId)
        activeCalls.set(callId, {
            [remotePartyId]: localPartyId,
            [this.client.id]: localClientId
        })
    }
}

function onOffer (offer, callId) {
    const currentCall = activeCalls.get(callId);
    if (currentCall) {
        const otherPartyId = Object.keys(currentCall).find(id => id !== this.client.id);
        this.broadcast.to(currentCall[otherPartyId]).emit('offer', offer)
    }
}

function onCallDecline () {
    requesterPool.delete(this.client.id)
}


function onDisconnect () {
    requesterPool.delete(this.client.id)
    requesterPool.delete(this.client.sockets.keys().next().value)
    activeCalls.delete(this.client.id)
}

const roomRoutes = {
    onConnected,
    offer: onOffer,
    call_request: onCallRequest,
    call_accept: onCallAccept,
    disconnect: onDisconnect
}

module.exports = roomRoutes