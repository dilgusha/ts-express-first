import { Request, Response } from "express";
import { AppDataSource } from "../../DAL/config/db";
import { User } from "../../DAL/entities/User.entity";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const dto = plainToInstance(CreateUserDto, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = userRepository.create(dto);
      await userRepository.save(user);

      return res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error while creating user:", error);

      return res.status(500).json({
        message: "An error occurred while creating the user",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
