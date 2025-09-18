import express from "express";
import { loginUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/login", loginUser);

export default userRouter;
