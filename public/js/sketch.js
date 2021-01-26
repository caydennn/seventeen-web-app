var socket;

function setup() {
    createCanvas(600, 400)
    background(51)

    socket = io.connect('http://localhost:8080')
    socket.on('mouse', newDrawing)
}

// Render the drawing coming from other clients
function newDrawing(data) {
    noStroke();
    fill(255, 0 , 100);
    ellipse(data.x, data.y, 20, 20)
}


function mouseDragged() {
    console.log('Sending: ' + mouseX + ', ' + mouseY)
    // Create data for the message
    const data = { 
        x: mouseX,
        y: mouseY 
    }
    // Send the data
    socket.emit('mouse', data)
    noStroke()
    fill(255)
    ellipse(mouseX, mouseY, 20, 20)
}


function draw() {
   
}