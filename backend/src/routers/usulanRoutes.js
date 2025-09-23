import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createUsulan,
  getUserUsulans,
  upload,
} from "../controllers/usulanControllers.js";

const usulanRouter = express.Router();

usulanRouter.post(
  "/usulan",
  authMiddleware,
  upload.single("dokumenSyarat"),
  createUsulan
);
usulanRouter.get("/usulan", authMiddleware, getUserUsulans);

export default usulanRouter;
