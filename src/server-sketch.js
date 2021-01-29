const niceware = require("niceware");
const drawObjects = require("./drawObjects");
const { getRandomItem } = require("./utils");
const short = require("short-uuid");

const bind = function (io) {
  const mapOfUsernames = {};
  const listOfRooms = [];

  io.on("connection", (socket) => {
    const userName =
      niceware.generatePassphrase(2) + "-" + niceware.generatePassphrase(2);
    mapOfUsernames[socket.id] = userName;

    // Receive mouse data
    socket.on("userDrawing", renderUserDrawing);
    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });

    socket.on("join-room", function (roomId) {
      // * If User left the field blank, create the room and add the user in
      if (roomId === "") {
        const newRoomId = short.generate();
        listOfRooms.push(newRoomId);

        socket.join(newRoomId);
        socket.emit("room-created", { user: userName, roomId: newRoomId });
      }
      // * If the User enters a field value, check if its a valid room ID and whether there is more than 2 people
      else {
        if (
          io.sockets.adapter.rooms.get(roomId) &&
          io.sockets.adapter.rooms.get(roomId).size < 2
        ) {
          // 1) Join the room
          socket.join(roomId);
          // 2) Inform host that you have joined
          socket
            .to(roomId)
            .emit("opponent-joined-room", { user: userName, roomId });

          // 3) Get the host name so the user can load it on their UI
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
          // * Room either invalid or full
        } else {
          socket.emit("room-not-found");
        }
      }
    });

    socket.on("start-game-trigger", ({ roomId }) => {
      // 1) Start a counter and sync it across the room users
      var counter = 17;
      var Countdown = setInterval(function () {
        io.in(roomId).emit("game-start-counter", counter);
        counter--;
        if (counter === 0) {
          io.in(roomId).emit("game-end", { roomId });
          clearInterval(Countdown);
        }
      }, 1000);

      // 2) Get a random object to draw and send to users
      const objectToDraw = getRandomItem(drawObjects);
      io.in(roomId).emit("game-start-render-ui", { roomId, objectToDraw });
    });

   

    function renderUserDrawing(data) {
      const { roomId } = data;
      socket.to(roomId).emit("opponent-drawing", data);
    }
  });
};

module.exports = {
  bind,
};
