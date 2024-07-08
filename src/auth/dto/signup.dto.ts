import { IsArray, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

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
    roles: string;

}
