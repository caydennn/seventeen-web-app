// * Hides the join room form and welcome message
function hidePregameUI() {
  // Remove the form
  $("#form").css("display", "none");

  // Clear the welcome text
  $("#welcome").css("display", "none");
}

// * Shows the UI when the User creates a room
function showCreateRoomUI(user, roomId) {
  // Make loading spinner visible
  $("#loader-container").css("visibility", "visible");

  // Show the room id
  var roomIdLabel = $("<p></p>").text(`Room ID: ${roomId}`);
  $("#room-info").append(roomIdLabel);

  // Show the users username
  var userLabel = $("<pre></pre>").text(`Your username: ${user}`);
  $("#user-name").append(userLabel);
}

// * Loads the UI when the Opponent joins the room
function loadOpponentJoinedUI(user, roomId) {
  // Remove the spinner
  $("#loader-container").css("visibility", "hidden");

  // Add opponent user name to the dom
  var oppponentUserLabel = $("<pre></pre>").text(`Their username: ${user}`);
  $("#opponent-name").empty();
  $("#opponent-name").append(oppponentUserLabel);

  // Add a start button
  var startButton = $(
    "<input class='btn btn-primary' type='button' id='start-button' value='START'/>"
  );
  $("#start-game-container").empty();
  $("#start-game-container").append(startButton);

  $("#start-button").on("click", function () {
    socket.emit("start-game-trigger", { roomId });
  });
}

// * Loads the UI when the User joins the room
function loadUserJoinedUI(user, otherUser, roomId) {
  // Feedback that waiting user to start game
  var waitingText = $(
    "<div><p>Waiting for host to start...<p><div class='spinner-border text-primary'></div></div>"
  );
  $("#start-game-container").append(waitingText);

  var roomIdLabel = $("<p></p>").text(`Room ID: ${roomId}`);
  $("#room-info").append(roomIdLabel);

  var userLabel = $("<pre></pre>").text(`Your username: ${user}`);
  $("#user-name").append(userLabel);

  // Add opponent user name to the dom
  var oppponentUserLabel = $("<pre></pre>").text(
    `Their username: ${otherUser}`
  );
  $("#opponent-name").append(oppponentUserLabel);
}

// * Loads the UI when the User(Host) starts the game
function loadStartGameUI(roomId, objectToDraw) {
  if (!myCanvas || !OtherCanvas) {
    myCanvas = prepareUserCanvas(roomId);
    OtherCanvas = prepareOtherCanvas();
  }

  myCanvas.canDraw = true;
  $("#next-button").css("display", "none");
  $("#object-label-container").empty();

  // Render Canvas
  $("#start-game-container").css("display", "none");
  myCanvas.reset();
  OtherCanvas.background(90);

  // Tell users what object to draw
  var objectToDrawLabel = $("<pre></pre>").text(`Draw a: `);
  objectToDrawLabel.append(`<h3>${objectToDraw}</h3>`);
  $("#object-label-container").append(objectToDrawLabel);
}

// * Shows the timer
function showTimer(count) {
  $("#safeTimerDisplay").css("visibility", "visible");
  $("#safeTimerDisplay").text(`${count}`);
}

// * Loads the UI when the timer is up
function loadEndGameUI(roomId) {
  // Freeze the canvas
  myCanvas.canDraw = false;

  // Change the timer text
  $("#safeTimerDisplay").text(`Time's Up!!`);

  // Render button for next question
  $("#next-button").css("display", "");

  $("#next-button").on("click", function () {
    socket.emit("start-game-trigger", { roomId });
  });
}
