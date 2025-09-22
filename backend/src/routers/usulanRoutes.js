import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createUsulan,
  getUserUsulans,
} from "../controllers/usulanControllers.js";

const usulanRouter = express.Router();

usulanRouter.post("/usulan", authMiddleware, createUsulan);
usulanRouter.get("/usulan", authMiddleware, getUserUsulans);

export default usulanRouter;
