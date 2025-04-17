// const express = require("express")
import express from "express";  //1st package that we are using
import dotenv from "dotenv";
import cookieParser from "cookie-parser" ; //for update profile
import cors from "cors";

import{connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"; //.js bcz local file
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
// const app = express(); No need of this now as we alredy create a app in socket.io

const PORT = process.env.PORT;  

app.use(express.json());
app.use(cookieParser()); //for update profile
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

})
);

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//replacing previous app with the server we created for socket
server.listen(PORT, ()=> {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});