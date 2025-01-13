import express from 'express';
import userRouter from '../Core/user/user.routes';

export const appRouter = express.Router()

appRouter.use('/user',userRouter)