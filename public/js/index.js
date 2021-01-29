$(document).ready(function () {
  $("#form").submit(function () {
    socket.emit("join-room", $("#room-id").val());
    return false;
  });
});

var button = document.getElementById("submit-room-id");

const stateMachine = {
  currentState: "pregame",

  roomNotFound() {
    this.currentState = "pregame";
    alert("Sorry that room doesn't exist!");
  },

  createRoom(user, roomId ) {
    this.currentState = 'lobby'
    hidePregameUI()
    showCreateRoomUI(user, roomId)
     
  },

  opponentJoinedRoom({ user, roomId }) {
    this.currentState = 'lobby'
    loadOpponentJoinedUI(user, roomId)
  },

  userJoinRoom(user, otherUser, roomId) {
    this.currentState = 'lobby'
    hidePregameUI()
    loadUserJoinedUI(user, otherUser, roomId)
  },

  gameStartRenderUI(roomId, objectToDraw) {
    this.currentState = 'gameplay'
    loadStartGameUI(roomId, objectToDraw)
  },

  gameStartCounter(count) {
    this.currentState = 'gameplay'
    showTimer(count)

  },

  gameEnd(roomId) {
    this.currentState = 'timeout'
   loadEndGameUI(roomId)
  },
};

