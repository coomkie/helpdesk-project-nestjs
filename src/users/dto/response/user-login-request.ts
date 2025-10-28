import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class UserLoginRequest {
    @IsNotEmpty()
    @MaxLength(150)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(16)
    @MinLength(1)
    password: string;
}