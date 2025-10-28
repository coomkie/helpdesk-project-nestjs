import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateUserRequest {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    username: string;

    @IsOptional()
    @MaxLength(150)
    @IsEmail()
    email: string;
}