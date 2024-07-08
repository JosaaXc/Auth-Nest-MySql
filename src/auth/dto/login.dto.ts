import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
	@MinLength(6)
	@MaxLength(30)
	password: string;

}