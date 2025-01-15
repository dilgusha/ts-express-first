// import { plainToInstance } from "class-transformer";
// import { validate } from "class-validator";
// import { Request, Response } from "express";
// import { AppDataSource } from "../../DAL/config/db";
// import { Contact } from "../../DAL/entities/Contact.entity";
// import { CreateContactDto } from "./dto/create-contact.dto";

// export class ContactController {
//   static async createContact(req: Request, res: Response): Promise<Response> {
//     try {
//       const dto = plainToInstance(CreateContactDto, req.body);

//       const errors = await validate(dto);
//       if (errors.length > 0) {
//         const formattedErrors = errors.map((error) => ({
//           property: error.property,
//           constraints: error.constraints,
//         }));

//         return res.status(400).json({
//           message: "Validation failed",
//           errors: formattedErrors,
//         });
//       }

//       const contact = plainToInstance(Contact, dto);
//       const savedContact = await AppDataSource.getRepository(Contact).save(contact);

//       return res.status(201).json({
//         message: "Contact created successfully",
//         data: savedContact,
//       });
//     } catch (error) {
//       console.error("Error while creating contact:", error);

//       return res.status(500).json({
//         message: "An error occurred while creating the contact",
//         error: error instanceof Error ? error.message : error,
//       });
//     }
//   }
// }





import { NextFunction, Request, Response } from "express";
import { Contact } from "../../DAL/entities/Contact.entity";
import { validate } from "class-validator";

export class ContactController {
  static async createContact(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        userId,
        name,
        surname,
        email,
        inquiryType,
        companyName,
        message,
      } = req.body

      const contact = await Contact.create({
        user: { id: userId },
        name,
        surname,
        email,
        inquiryType,
        companyName,
        message
      })
      const errors = await validate(contact);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
      }
      const savedContact = await contact.save();


      res.status(201).json({ savedContact })

    } catch (error) {
      console.error("Error while creating contact:", error);

      return res.status(500).json({
        message: "An error occurred while creating the contact",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async getContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const contacts = await Contact.find({relations:["user"]});
      return res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error while fetching contacts:", error);

      return res.status(500).json({
        message: "An error occurred while fetching contacts",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId,name, surname, email, inquiryType, companyName, message } = req.body;
      const id = req.params.id;
      const contact = await Contact.findOne({
        where: { id: +id },
        relations: ["user"]
      });
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      const updatedData = await Contact.update(id, {
        name,
        surname,
        email,
        inquiryType,
        companyName,
        message,
      });
      return res.status(200).json({ updatedData });
    } catch (error) {
      console.error("Error while updating contact:", error);
    }
  }

  static async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const contact = await Contact.findOne({
        where: { id: +id }
      })
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      await Contact.softRemove(contact)
      return res.status(200).json({ message: "Contact deleted successfully" });
    }
    catch (error) {
      console.error("Error while deleting contact:", error);
      res.status(500).json({ message: "An error occurred while deleting the contact" });
    }
  }

}
