import { Router } from "express";
import { UserController } from "./user.controller";

export const userRouter = Router();
const controller = UserController();

userRouter.post("/register", controller.Register);