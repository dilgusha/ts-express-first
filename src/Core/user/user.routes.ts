import express from "express";
import { UserController } from "./user.controller";
import { CreateUserDto } from "./dto/create-user.dto";

const userRouter = express.Router();

userRouter.post(
  "/users",
  async (req, res, next) => {
    try {
      await UserController.createUser(req, res);
    } catch (error) {
      next(error); 
    }
  }
);

export default userRouter;
