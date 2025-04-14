import express from 'express';
import { createServer } from 'node:http';
import { Server as ServerSocket } from "socket.io"
import { env } from './env.js';


const app = express();
const serverNode = createServer(app);
const io = new ServerSocket(serverNode,{
    cors: {
        origin: `${env().cors_origin}`,
        methods: ['GET','POST'],
        allowedHeaders: ['Content-type'],
        credentials: true
    }
})

/****** variable pour le jeux *******/

var togglePlayer = true; // first player, true for ROND, false for CROIX
var countPlayer = 0; // max player 2
var testRoom = "some room";
var currentPlayerId = 'O';
var playerName1 = null;
var playerName2 = null;

/************************************/


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection',(socket) => {
    countPlayer += 1;
    socket.join(testRoom);

    // init user
    socket.on('request_name',(event) => {
      console.log("playerName:",event.playerName);
      if (countPlayer == 1) playerName1 = event.playerName;
      if (countPlayer == 2) playerName2 = event.playerName;
      (countPlayer == 1) ? io.to(testRoom).emit('init_event',{ playerName: playerName1, playerFirst: currentPlayerId, playerId: 'O'}) : io.to(testRoom).emit('init_event',{ playerName: playerName2, playerFirst: currentPlayerId, playerId: 'X' }); 
    });
    console.log('a user connected');
    
    // init play event 
    socket.on('cases_event',(event) => {
      console.log(event.playerId,"  ",currentPlayerId);
      
      if (event.playerId == currentPlayerId) {
        io.to(testRoom).emit('cases_event',event);
        currentPlayerId = 'X';
      };
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
})

serverNode.listen(env().port, () => {
  console.log(`server running at http://localhost:${env().port}`);
});

