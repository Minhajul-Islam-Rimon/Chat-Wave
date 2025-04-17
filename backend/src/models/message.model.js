import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(  //creating schema
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, //sender id & receiver id will be a ref to model
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }  //to show the time
);

const Message = mongoose.model("Message", messageSchema); //creating model

export default Message;