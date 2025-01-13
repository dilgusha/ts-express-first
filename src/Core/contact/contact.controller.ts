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




// import { Request, Response } from "express";
// import { AppDataSource } from "../../DAL/config/db";
// import { Contact } from "../../DAL/entities/Contact.entity";
// import Joi from "joi";

// export class ContactController {
//   // Joi şeması tanımlama
//   static contactSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().min(10).max(15).required(),
//     message: Joi.string().optional(),
//   });

//   static async createContact(req: Request, res: Response): Promise<Response> {
//     try {
//       const { error, value } = this.contactSchema.validate(req.body, {
//         abortEarly: false,
//       });

//       if (error) {
//         const formattedErrors = error.details.map((detail) => ({
//           message: detail.message,
//           field: detail.path.join("."),
//         }));

//         return res.status(400).json({
//           message: "Validation failed",
//           errors: formattedErrors,
//         });
//       }

//       const contact = new Contact();
//       Object.assign(contact, value);

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



import { Request, Response } from "express";
import Joi from "joi";
import { AppDataSource } from "../../DAL/config/db";
import { Contact } from "../../DAL/entities/Contact.entity";

export class ContactController{
     static  createContact = async (req: Request, res: Response): Promise<Response | void> => {
      const validData = await Joi.object({
        name: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().email().required(),
        message: Joi.string().trim().optional(),
      })
        .validateAsync(req.body, { abortEarly: false })
        .catch((err) => {
          console.error("Validation error:", err);
          const errorList = err.details.map((item:any) => item.message);
          return res.status(422).json({
            message: "Validation failed",
            errors: errorList,
          });
        });
    
      if (!validData) return; 
    
      const existingContact = await AppDataSource.getRepository(Contact).findOne({
        where: { email: validData.email },
      });
    
      if (existingContact) {
        return res.status(400).json({
          message: `${validData.email} - already exists in the system!`,
        });
      }
    
    
      const newContact = AppDataSource.getRepository(Contact).create(validData);
      const savedContact = await AppDataSource.getRepository(Contact).save(newContact);
    
      return res.status(201).json({
        message: "Contact created successfully",
        data: savedContact,
      });
    };

}
