import express from 'express';
import contactRouter from '../Core/contact/contact.routes';
import { userRouter } from '../Core/user/user.routes';

export const appRouter = express.Router()

appRouter.use('/user',userRouter)
appRouter.use('/contact',contactRouter)