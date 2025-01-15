import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { User } from "../../DAL/entities/User.entity";

const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email } = req.body;

    const user = await User.findOne({ where: {email:email} });
    if (user) return next(res.json("Bu emaile uygun user artiq movcuddur"));

    const newUser = User.create({
      firstName,
      lastName,
      email,
    });

    const errors = await validate(newUser);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UserController = () => ({
  Register,
});