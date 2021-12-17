const { Socket } = require("socket.io");

const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



var subfield;
var id=0;
let players = [];

function other(socketId){
    const index = players.indexOf(socketId);
    if(index > - 1){
        return players[(index + 1) % 2];
    }
}

function delPlayer(socketId){
    const index = players.indexOf(socketId);
    if( index > -1){
        players.splice(index,1);
    }
}

Socketio.on("connection", socket =>{
    socket.on("isFull",(bool)=>{
        if(players.length < 2){
            Socketio.to(socket.id).emit("isFull", false);
        }
        else{
            Socketio.to(socket.id).emit("isFull", true);
        }
    });

    socket.on("joinRoom", (roomCode) =>{
        if(players.length < 2){
        socket.join(roomCode);
        players.push(socket.id);
        if(Socketio.sockets.adapter.rooms.get(roomCode).size <= 2){
            //players[Socketio.sockets.adapter.rooms.get(roomCode).size -1 ] = socket.id;
        const rndInt = randomIntFromInterval(0,1);
        id = roomCode;
        if(Socketio.sockets.adapter.rooms.get(roomCode).size == 2){
            Socketio.to(players[rndInt]).emit("isTurn", true);
            Socketio.to(players[(rndInt+1) %2]).emit("isTurn", false);
            Socketio.to(roomCode).emit("onStart", true);
        }
        }
        }
    });

    socket.on("disconnect",() =>{
        delPlayer(socket.id);
        Socketio.to(id).emit("hasLeft",id);

    })

    socket.on("leaveRoom", (roomCode) =>{
        socket.leave(roomCode);
        players = [];
    
    })

    socket.on("leave", (roomCode) =>{
        socket.leave(roomCode);
        delPlayer(socket.id);
        Socketio.to(roomCode).emit("hasLeft",roomCode);
    })

    socket.on("move", (data, roomCode) =>{
        subfield = data;
        Socketio.to(other(socket.id)).emit("position", subfield);
    });
});



Http.listen(4000, () =>{
    console.log("Listening at : 4000...");
})
