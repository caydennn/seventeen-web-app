const HOST = window.location.host;


let UserCanvas 
let OtherCanvas

function prepareUserCanvas(roomId) {
  $("#left").empty()

  // User Canvas for user to draw on
  const userCanvas = (p) => {
    const userId = socket.id;
    // console.log(socket);

    p.setup = function () {
      // p.createCanvas(700, 500);
       p.createCanvas(600, 600);
    //  ("user-canvas")
      p.frameRate(60);
      p.background(90);
      // p.id("test")
    };

    p.draw = function () {};

    p.mouseDragged = function () {
      const data = {
        roomId,
        x: p.mouseX,
        y: p.mouseY,
      };
console.log("Sending Out:")
      console.log(data.x, data.y)
      // Send the data
      socket.emit("userDrawing", data);
      p.noStroke();
      p.fill(255);
      p.ellipse(data.x, data.y, 20, 20);
    };
  };
  
UserCanvas = new p5(userCanvas, "left");
// console.log(UserCanvas)
}

function prepareOtherCanvas() {
  $("#right").empty()

// Opponent Canvas to see what the opponent is drawing
const otherCanvas = (otherP) => {
  function newDrawing(data) {
console.log("Receiving:")

    console.log(data.x, data.y)
    otherP.noStroke();
    otherP.fill(255, 0, 3);
    otherP.ellipse(data.x, data.y, 20, 20);
  }

  otherP.setup = function () {
    // otherP.createCanvas(700, 500);
    otherP.createCanvas(600, 600);
    // _otherP.id("opponent-canvas")
    otherP.frameRate(60);
    otherP.background(90);

    socket.on("opponent-drawing", newDrawing);
  };

  otherP.draw = function () {};
};

OtherCanvas = new p5(otherCanvas, "right");

} 

