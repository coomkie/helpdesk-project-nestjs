import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateUserRequest {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;

    @IsNotEmpty()
    @MaxLength(150)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(16)
    password: string;
}