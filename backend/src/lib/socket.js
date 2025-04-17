import { Server } from "socket.io";
import http from "http";
import express from "express";


//create express app & server
const app = express();
const server = http.createServer(app);

//create socket io server

const io =new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }


//used to store online user
const userSocketMap ={};  //{userId(from DB): socketId}

//try to listen  from any incomming connection then we implement it in client (frontend)
io.on("connection", (socket) =>{
   console.log("A user connected", socket.id); 

   const userId = socket.handshake.query.userId; //after login we need to update that user is online
   if (userId) userSocketMap[userId] = socket.id; //update online status

   // io.emit() is used to send events to all the connected clients
   io.emit("getOnlineUsers", Object.keys(userSocketMap));


   socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id); 
    
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
   });
});

export { io, app, server };