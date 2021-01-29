
function prepareUserCanvas(roomId) {
  $("#left").empty();
  let p = new p5(() => {}, "left");

  let myCanvas = {
    canvas: p,
    canDraw: true,
    reset: () => {
      p.clear();
      p.background(90);
    }
  }

  p.createCanvas(600, 600);
  //  ("user-canvas")
  p.frameRate(60);
  p.background(90);

  p.draw = function () {};

  p.mouseDragged = function () {
    if (!myCanvas.canDraw) {
      return;
    }
    const data = {
      roomId,
      x: p.mouseX,
      y: p.mouseY,
    };
    // Send the data
    socket.emit("userDrawing", data);
    p.noStroke();
    p.fill(255);
    p.ellipse(data.x, data.y, 10, 10);
  };

  return myCanvas;
  // console.log(UserCanvas)
}

function prepareOtherCanvas() {
  $("#right").empty();

  // Opponent Canvas to see what the opponent is drawing
  const otherCanvas = (otherP) => {
    function newDrawing(data) {

      otherP.noStroke();
      otherP.fill(255, 0, 3);
      otherP.ellipse(data.x, data.y, 10, 10);
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

  return new p5(otherCanvas, "right");
}
