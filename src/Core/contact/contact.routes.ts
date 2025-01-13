import express from "express";
import { ContactController } from "./contact.controller";

const contactRouter = express.Router();
contactRouter.post(
  "/contact",
  async (req, res, next) => {
    try {
      await ContactController.createContact(req, res);
    } catch (error) {
      next(error); 
    }
  }
);

export default contactRouter;
