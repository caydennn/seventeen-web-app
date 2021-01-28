// const HOST = window.location.host;
// console.log("host: " + HOST)
// const WS_URL = window.location.protocol == "https:" ? `wss://${HOST}/` : `ws://${HOST}/`;
// const ws = new WebSocket(WS_URL);

var button = document.getElementById("submit-room-id");

var messages = document.getElementById("messages");

// button.addEventListener("click", function () {
//   //   window.location = "/yikes";
//   // console.log(socket)
//   // socket.emit('clicked-socket', JSON.stringify({msg: 'hello world'}))
// });

$(document).ready(function () {
  $("#form").submit(function () {
    socket.emit("join-room", $("#room-id").val());
    //socket.emit('message', "Input");
    //$('#Input').val('');
    return false;
  });
});


socket.on("room-created", (data) => {
  const { user, roomId } = data;

  // Remove the form
  $("#form").css('display', "none")

  // Clear the welcome text
  $("#welcome").css('display', 'none')

  // Make loading spinner visible
  $("#loader-container").css("visibility", "visible");

  var roomIdLabel = $("<pre></pre>").text(`Room ID: ${roomId}`);
  $("#room-info").append(roomIdLabel);

  var userLabel = $("<pre></pre>").text(`Your username: ${user}`);
  $("#user-name").append(userLabel);

});


socket.on("room-not-found", () => {
  alert("Sorry that room doesn't exist!")
}) 


// * Handle when an opponent joins the room
socket.on("opponent-joined-room", (data) => {
  // console.log("A USER JOINED MY ROOM");
  const { user, roomId } = data;

  // Remove the spinner
  $("#loader-container").css("visibility", "hidden");

  // Add opponent user name to the dom
  var oppponentUserLabel = $("<pre></pre>").text(`Their username: ${user}`);

  $("#opponent-name").empty();
  $("#opponent-name").append(oppponentUserLabel);

  // Add a start button
  var startButton = $(
    '<input type="button" id="start-button" value="START GAME"/>'
  );
  $("#start-game-container").empty()
  $("#start-game-container").append(startButton);

  $("#start-button").on("click", function () {
    socket.emit("start-game-trigger", { roomId });
    //   $('#start-game-container').empty()
  });
});

// * Handle when you join a room
socket.on("user-joined-room", ({ user, otherUser, roomId }) => {

  // Remove the form
  $("#form").css('display', "none")

   // Clear the welcome text
   $("#welcome").css('display', 'none')

  // Feedback that waiting user to start game
  var waitingText = $('<pre>Waiting for host to start...<pre>')
  $("#start-game-container").append(waitingText);

  var roomIdLabel = $("<pre></pre>").text(`Room ID: ${roomId}`);
  $("#room-info").append(roomIdLabel);

  var userLabel = $("<pre></pre>").text(`Your username: ${user}`);
  $("#user-name").append(userLabel);

  // Add opponent user name to the dom
  var oppponentUserLabel = $("<pre></pre>").text(
    `Their username: ${otherUser}`
  );
  $("#opponent-name").append(oppponentUserLabel);
});

socket.on("user-left-room", () => {
  alert("user left the room")
  // console.log("user left room")
})
//* GAME START

// Handler for Rendering the Canvas
socket.on("game-start-render-ui", ({ roomId, objectToDraw }) => {
  // console.log("render")
  // Change attributes of the previous canvas (Remove the id)
  // UserCanvas.remove()
  // OtherCanvas.remove()
  $("#object-label-container").empty()

  


  // Render Canvas
  $("#start-game-container").css("display", "none")
  prepareUserCanvas(roomId);
  prepareOtherCanvas();

  // Render object to draw
  var objectToDrawLabel = $("<pre></pre>").text(`Draw a: `);
  objectToDrawLabel.append(`<h3>${objectToDraw}</h3>`)

  $("#object-label-container").append(objectToDrawLabel)

});

// Handler for Game Counter
socket.on("game-start-counter", (count) => {

  $("#safeTimerDisplay").css("visibility", "visible");
  $("#safeTimerDisplay").text(`${count}`);
});


//* GAME END
socket.on("game-end", ({roomId}) => {
  // console.log("Game End!");
  // console.log(UserCanvas);

  // When the game ends, freeze the canvas
  UserCanvas.mouseDragged = function () {
    return;
  };
  UserCanvas.draw = function () {
    return;
  };

  // Change the timer text
  $("#safeTimerDisplay").text(`Time's Up!!`);

  // Render button for next question
  $("#next-button").css("display", "")

  $("#next-button").on("click", function () {
    
    socket.emit("start-game-trigger", { roomId });
   $("#next-button").css("display", "none")

    //   $('#start-game-container').empty()
  });
});

socket.on("to-client", function (jsonData) {
  const parsedData = JSON.parse(jsonData);
  console.log(parsedData);
  var item = document.createElement("li");
  item.textContent = parsedData.data;
  messages.appendChild(item);
});
