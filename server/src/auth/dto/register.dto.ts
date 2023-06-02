import { IsEmail, MinLength } from "class-validator";

export class RegisterDto {

    @IsEmail()
    email: string;

    @MinLength(6, {
        message: "Password must be at least 6 characters"
    })
    password: string;

    @MinLength(3, {
        message: "Login must be at least 3 characters"
    })
    login: string;
}