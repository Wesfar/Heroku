

const express = require('express');

const socket = require('socket.io');
const http = require('http');

const app = express();

const server = http.Server(app);
const io = socket(server); // Attach socket.io to our server

app.use(express.static('public')); // Serve our static assets from /public
console.log("My Socket Server Is Running");

// server.listen(3000, () => console.log('Server started'));
server.listen(process.env.PORT || 3000 ,function(){
    (process.env.port) ? console.log("Heroku Server up and running on port "+process.env.PORT) : console.log("Local Server up and running on port "+3000);
});

let playersData = {
    players: []
  }

class Player {
    constructor(player_id, player_name) {
        this.player_id = player_id,
        this.player_name = player_name
    }
}

io.sockets.on('connection', newConnection);

function newConnection (socket){
    console.log("New Connection: " + socket.id );


    socket.on("newPlayer",newPlayer);
    
    function newPlayer(data){
        console.log("Data from Connection: "+ socket.id +" => " + "New Player = "+ data.player_name);

        playersData.players.push(new Player(socket.id, data.player_name));

        console.log (playersData.players);

        // enviar do socket emissor para todos os sockets (incluindo o próprio)
        io.sockets.emit("playersBroadcast", playersData);

    }


    socket.on("mouse",mouseMsg);

    function mouseMsg(data){
        //console.log("Data from Connection: "+ socket.id +" => " + "X = "+data.x + " | Y = "+data.y);
        
        // enviar do socket emissor para todos os outros
        socket.broadcast.emit("mouseBroadcast",data);
    
    
        // enviar do socket emissor para todos os sockets (incluindo o próprio)
        // io.sockets.emit("mouse",data);
    }

    
    socket.on("disconnect", exitedPlayer);

    function exitedPlayer (data){
        console.log("Data from Connection: "+ socket.id +" => Exited");
        for (i=0;i<playersData.players.length;i++){
            if(playersData.players[i].player_id == socket.id){
                playersData.players.splice(i,1);
            }

        }
        console.log (playersData.players);
        io.sockets.emit("playersBroadcast", playersData);

    }


};




