import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ValidRoles } from "../enums/valid-roles.enum";

export class SignupDto {
    
	@IsString()
	@MinLength(3)
	@MaxLength(100)
	fullName: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(30)
	password: string;

	@IsString()
	@MinLength(10)
	@MaxLength(10)
    phoneNumber: string;

	@IsString()
	@IsOptional()
	@IsEnum(ValidRoles)
	roles: string;

}
