import express from 'express';
import { createServer } from 'node:http';
import { Server as ServerSocket } from "socket.io"
import { env } from './env.js';
import matchRoutes from './match.route.js';
import { findByRoomName, postNewMatch, getAllDoc,updateMatch } from './database/db.access.js';
import { generateId } from './helpers/generater.js';
import { TurnMoveDico } from './database/turnMove.db.js';

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

/******************************* Middleware ***************************************/
app.use(express.json());

/**********************************************************************************/

/**************************** variable pour le jeux ********************************/

var turnMoveDico = new TurnMoveDico();

/************************************************************************************/

/**************************************** route **************************************/
app.get('/', (req, res) => {
  res.send('<h1>This is a socket-server</h1>');
});
app.use('/',matchRoutes);

/**************************************************************************************/

/********************************* socker server **************************************/

io.on('connection',(socket) => {
  console.log('a user connected:');

  // init user
  socket.on('request_name&room',async (event) => {
    console.log("    playerName:",event.playerName);

    try {
      let match = await findByRoomName(event.roomName);

      if (match.length != 0 && match[0].playerName2) {
        io.emit('init_event',{ 
          playerName: event.playerName, 
          playerFirst: null, 
          playerId: null
        })
        return;
      }
      socket.join(event.roomName);
      console.log(event.playerName," join  room => ",event.roomName);
      

      // player two or one ?
      if (match.length == 0) {
        console.log("    player 1");

        const newMatch = {
          _id: generateId(),
          playerName1: event.playerName,
          playerName2: "",
          roomName: event.roomName,
          tableStatus: "",
          turnToMove: "O",
          playerId1: "O",
          playerId2: "X"
        }
        turnMoveDico.addTurn(newMatch._id,newMatch.turnToMove);
        await postNewMatch(newMatch)

        io.to(newMatch.roomName).emit('init_event',{ 
          playerName: newMatch.playerName1,
          playerFirst: newMatch.turnToMove, 
          playerId: newMatch.playerId1,
          matchId: newMatch._id
        })

      } else {
        console.log("    player 2");
        
        match[0].playerName2 = event.playerName; 
        turnMoveDico.addTurn(match[0]._id,match[0].turnToMove);
        await updateMatch(match[0]);

        io.to(match[0].roomName).emit('init_event',{ 
          playerName: match[0].playerName2,
          playerFirst: match[0].turnToMove, 
          playerId: match[0].playerId2,
          matchId: match[0]._id
        })
      } 
    } catch (error) {
      console.error(error);
    }
  });
  
  // init play event 

  socket.on('cases_event',(event) => {
    
    if (event.playerId == turnMoveDico.getValue(event.matchId)) {
      io.to(event.roomName).emit('cases_event',event);
      (turnMoveDico.getValue(event.matchId) == 'X') ? turnMoveDico.addTurn(event.matchId,'O') : turnMoveDico.addTurn(event.matchId,'X');
    };
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
})

serverNode.listen(env().port, () => {
  console.log(`server running at http://localhost:${env().port}`);
});



/********************************************************************************/
