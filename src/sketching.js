const bind = function(io) {
    
io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)

    // Receive mouse data
    socket.on('mouse', mouseMsg)

    function mouseMsg(data) {
        socket.broadcast.emit('mouse' , data)

        // io.sockets.emit('mouse' , data) // THIS INCLUDES THE CLIENT THAT SEND THE DATA
    }
  });

}

module.exports = {
    bind,
}