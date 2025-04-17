import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage  } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); //to show user in side bar
router.get("/:id", protectRoute, getMessages);          //to get message

router.post("/send/:id", protectRoute, sendMessage);//to send message

export default router;