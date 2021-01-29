socket.on('room-created', ({ user, roomId }) => stateMachine.createRoom(user, roomId ))

socket.on('room-not-found', () => stateMachine.roomNotFound())

socket.on("opponent-joined-room", (data) => stateMachine.opponentJoinedRoom(data))


let myCanvas;
let OtherCanvas;
socket.on("user-joined-room", ({ user, otherUser, roomId }) => stateMachine.userJoinRoom(user, otherUser, roomId))

socket.on("game-start-render-ui", ({ roomId, objectToDraw }) => stateMachine.gameStartRenderUI(roomId, objectToDraw))

socket.on('game-start-counter', (count) => stateMachine.gameStartCounter(count))

socket.on('game-end', ({roomId}) => stateMachine.gameEnd(roomId))

