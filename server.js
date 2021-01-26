const http = require('http');
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const sketching = require('./src/sketching')

// const heartbeat = require('./src/heartbeat');
// const messaging = require('./src/messaging');

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0"

const app = express();
const server = http.createServer(app);


// Serve the static files
const root = path.resolve(__dirname);
app.use(express.static(root + '/public'));


// heartbeat.bind(wss);
// messaging.bind(wss);

const io = socket(server)
sketching.bind(io)

app.get('/yikes', (req, res) => {
    res.sendFile('/public/yikes.html' , { root })
})


server.listen(PORT, HOST, () => {
    console.log(`Starting server on port ${PORT}`);
});
