import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/profileControllers.js";

const profileRouter = express.Router();

profileRouter.get("/profile", authMiddleware, getUserProfile);

export default profileRouter;
