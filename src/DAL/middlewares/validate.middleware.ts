// import { plainToInstance } from "class-transformer";
// import { validate } from "class-validator";
// import { NextFunction, Request, Response } from "express";

// export const validateRequest = <T>(dtoClass: new (...args: any[]) => T)=> async (req:Request, res:Response, next:NextFunction) => {
//   const dtoInstance = plainToInstance(dtoClass, req.body );
//   const errors = await validate(dtoInstance);

//   if (errors.length > 0) {
//     return res.status(400).json({
//       message: "Validation failed",
//       errors: errors.map((err) => err.constraints),
//     });
//   }

//   next();
// };
