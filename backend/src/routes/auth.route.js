import express from "express";
import {checkAuth,login,logout,signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/signup",signup );
router.post("/login",login );
router.post("/logout",logout );

//update profile
router.put("/update-profile",protectRoute, updateProfile); //checking authentication to update profile

router.get("/check", protectRoute, checkAuth);//check the user is authentic or not,if authentic then it will call next function

export default router;

