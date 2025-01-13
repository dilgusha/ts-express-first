import { IsOptional, Length, Max, Min } from "class-validator";

export class CreateUserDto {
  @Length(5,10)
  firstName: string;

  @Length(5,10)
  @IsOptional()
  lastName: string;

}
