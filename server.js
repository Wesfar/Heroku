

const express = require('express');

const socket = require('socket.io');
const http = require('http');

const app = express();

const server = http.Server(app);
const io = socket(server); // Attach socket.io to our server

app.use(express.static('public')); // Serve our static assets from /public
console.log("My Socket Server Is Running");

server.listen(3000, () => console.log('Server started'));


io.sockets.on('connection', newConnection);

function newConnection (socket){
    console.log("New Connection: " + socket.id );

    socket.on("mouse",mouseMsg);

    function mouseMsg(data){
        console.log("Data from Connection: "+ socket.id +" => " + "X = "+data.x + " | Y = "+data.y);
        
        // enviar do socket emissor para todos os outros
        socket.broadcast.emit("mouseBroadcast",data);


        // enviar do socket emissor para todos os sockets (incluindo o próprio)
        // io.sockets.emit("mouse",data);
    }
};


