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

//try to listen  from any incomming connection then we implement it in client (frontend)
io.on("connection", (socket) =>{
   console.log("A user connected", socket.id); 

   socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);  
   });
});

export { io, app, server };