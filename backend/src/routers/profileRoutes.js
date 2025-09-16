import express from "express";
import { getUserById } from "../controllers/profileControllers.js";

const profileRouter = express.Router();

profileRouter.get("/profile/:user_id", getUserById);

export default profileRouter;
