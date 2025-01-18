import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty({ message: "Name is required" })
  @Length(2, 50, { message: "Name must be between 2 and 50 characters" })
  name: string;

  @IsNotEmpty()
  @Length(2, 50, { message: "Surname must be between 2 and 50 characters" })
  surname: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  @IsOptional()
  @Length(2, 100, { message: "Company name must be between 2 and 100 characters" })
  companyName?: string;

  @IsNotEmpty({ message: "Inquiry type is required" })
  @Length(2, 50, { message: "Inquiry type must be between 2 and 50 characters" })
  inquiryType: string;

  @IsNotEmpty({ message: "Message is required" })
  @Length(10, 500, { message: "Message must be between 10 and 500 characters" })
  message: string;
}
