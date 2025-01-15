import express from "express";
import { ContactController } from "./contact.controller";

const contactRouter = express.Router();
contactRouter.post(
  "/create",
  async (req, res, next) => {
    try {
      await ContactController.createContact(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
contactRouter.get(
  "/get-contacts",
  async (req, res, next) => {
    try {
      await ContactController.getContacts(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

contactRouter.put(
  "/update/:id",
  async (req, res, next) => {
    try {
      await ContactController.updateContact(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

contactRouter.delete(
  "/soft-delete/:id",
  async (req, res, next) => {
    try {
      await ContactController.deleteContact(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default contactRouter;
