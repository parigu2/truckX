module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('shipmentUpdate', () => {
        socket.broadcast.emit('updateReceive')
    })

    socket.on('pickupRequest', (pickup, delivery) => {
        socket.broadcast.emit('pickupRequested', pickup, delivery)
    })

    socket.on('disconnect', () => {
        console.log(`connection ${socket.id} has left the building`)
    })
  })
}
