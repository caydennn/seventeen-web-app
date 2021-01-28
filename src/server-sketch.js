const niceware = require("niceware");
const drawObjects = require('./drawObjects')
const {getRandomItem} = require('./utils')
const short = require('short-uuid');

const bind = function (io) {
  const mapOfUsernames = {};
  const listOfRooms = []

  io.on("connection", (socket) => {
    const userName = niceware.generatePassphrase(2) + "-" + niceware.generatePassphrase(2);
    mapOfUsernames[socket.id] = userName

    // console.log("all rooms")
    // console.log(io.sockets.adapter.rooms)
    
    // Receive mouse data
    socket.on("userDrawing", renderUserDrawing);
    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });

    socket.on("disconnecting", () => {
      // console.log("Rooms user was in:")   
      // console.log(socket.rooms)
    

    })

    socket.on("join-room", function (roomId) {
      // If User did not enter Room Id, add the user to a new room and add him in
      if (roomId === "") {
        const newRoomId =
          short.generate();
        console.log(`Creating Room: ${newRoomId}`);
        listOfRooms.push(newRoomId)
        console.log("lsit of rooms")
        console.log(listOfRooms)


       

        socket.join(newRoomId);
        socket.emit("room-created", { user: userName, roomId: newRoomId });
      } else {
        if (
          io.sockets.adapter.rooms.get(roomId) &&
          io.sockets.adapter.rooms.get(roomId).size < 2
        ) {
          socket.join(roomId);
          console.log(`user ${socket.id} has joined room ${roomId}`);
          // Inform the person in the room that someone has joined
          socket
            .to(roomId)
            .emit("opponent-joined-room", { user: userName, roomId });
          // console.log(io.sockets.adapter.rooms.get(roomId))
          let otherUserId;
          io.sockets.adapter.rooms.get(roomId).forEach((element) => {
            if (element !== socket.id) {
              otherUserId = element;
            }

          });
          socket.emit("user-joined-room", {
            user: userName,
            otherUser: mapOfUsernames[otherUserId],
            roomId,
          });
        }

        else {
          socket.emit("room-not-found")
        }
        // socket.emit("")
      }
    });

    socket.on("start-game-trigger", ({ roomId }) => {

      // Get a random object
      const objectToDraw = getRandomItem(drawObjects)

      var counter = 15;
      var Countdown = setInterval(function () {
        io.in(roomId).emit("game-start-counter", counter);
        // socket.emit("hello", counter);
        counter--;
        if (counter === 0) {
          io.in(roomId).emit("game-end", {roomId}); 
          clearInterval(Countdown);
        }
      }, 1000);
      io.in(roomId).emit("game-start-render-ui", { roomId , objectToDraw })

      // io.in(roomId).emit("game-start");
    });


    socket.on("next-game-trigger", ({roomId}) => {
      //! Get a new question


    })

    function renderUserDrawing(data) {
      const { roomId } = data;
      socket.to(roomId).emit("opponent-drawing", data);

      // io.sockets.emit('opponent-drawing' , data) // THIS INCLUDES THE CLIENT THAT SEND THE DATA
    }
  });
};

module.exports = {
  bind,
};
