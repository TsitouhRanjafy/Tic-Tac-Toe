import express from 'express';
import { createServer } from 'node:http';
import { Server as ServerSocket } from "socket.io"
import { env } from './env.js';
import matchRoutes from './match.route.js';

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

/***************** Middleware **********************/
app.use(express.json());

/***************************************/

/****** variable pour le jeux *******/

var countPlayer = 1; // max player 2
var currentPlayerId = 'O'; // first move
var playerName1 = null;
var playerName2 = null;

/************************************/


/********************** route **********************/
app.get('/', (req, res) => {
  res.send('<h1>This is a socket-server</h1>');
});
app.use('/',matchRoutes);

/********************************************/

io.on('connection',(socket) => {
  console.log('a user connected');

  // init user
  socket.on('request_nam&room',(event) => {
    console.log("playerName:",event.playerName);
    if (countPlayer > 2) return;
    socket.join(event.roomName);
    if (countPlayer == 1) {
      playerName1 = event.playerName;
      io.to(event.roomName).emit('init_event',{ playerName: playerName1, playerFirst: currentPlayerId, playerId: 'O'});
    } 
    if (countPlayer == 2) {
      playerName2 = event.playerName;
      io.to(event.roomName).emit('init_event',{ playerName: playerName2, playerFirst: currentPlayerId, playerId: 'X' }); 
    } 
    countPlayer++;
    console.log(event.playerName,"join a room => ",event.roomName," count player:",countPlayer);
  });
  
  // init play event 
  socket.on('cases_event',(event) => {
    
    if (event.playerId == currentPlayerId) {
      io.to(event.roomName).emit('cases_event',event);
      (currentPlayerId == 'X') ? currentPlayerId = 'O' : currentPlayerId = 'X'; // il faut gérer les joueurs (ex: à qui le tour dans cette room?)
    };
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
})

serverNode.listen(env().port, () => {
  console.log(`server running at http://localhost:${env().port}`);
});

