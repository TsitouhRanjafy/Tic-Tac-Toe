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

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection',(socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        
    })
})

serverNode.listen(env().port, () => {
  console.log(`server running at http://localhost:${env().port}`);
});

