import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


//we will fetch evry single user by function but not ourself
export const getUsersForSidebar = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id; //we can grab the user from request
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //find all user without currently logged in user & fetch everythinwithout pass bcz we don't send back pass to client
    
        res.status(200).json(filteredUsers);
      } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
};


//for getting mesage 

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params; //rename the id to userToChatId so that the code will be more clean 
      const myId = req.user._id; //getting the sender id which is  my id
        //find all the message where i am the sender or other user is sender
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages); //return all the messages
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //for sending message this can be a text or image

  export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body; //grabbing text or img from req.body
      const { id: receiverId } = req.params; //grabbing receiver id 
      const senderId = req.user._id; //which is me
        //checking user is passing img or not
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({   //after handeling the img case now creating the message
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();  //saving  new msg to database 

      //real time functionility by socket.io

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage); //resourse has been created and send this new msg back to client
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };