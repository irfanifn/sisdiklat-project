import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createUsulan,
  getUserUsulans,
  upload,
} from "../controllers/usulanControllers.js";
import { getPersyaratan } from "../controllers/persyaratanControllers.js";

const usulanRouter = express.Router();

usulanRouter.post(
  "/usulan",
  authMiddleware,
  upload.single("dokumenSyarat"),
  createUsulan
);
usulanRouter.get("/usulan", authMiddleware, getUserUsulans);
usulanRouter.get("/persyaratan/:jenisUsulan", authMiddleware, getPersyaratan);

export default usulanRouter;
