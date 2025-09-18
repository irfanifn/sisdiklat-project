import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/profileControllers.js";

const profileRouter = express.Router();

profileRouter.get("/profile", authMiddleware, getUserProfile);
profileRouter.put("/profile", authMiddleware, updateUserProfile);

export default profileRouter;
