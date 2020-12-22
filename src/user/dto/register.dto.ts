import { IsString, MinLength } from "class-validator"

export class RegisterDto {
    @IsString()
    @MinLength(2)
    username : string;

    @IsString()
    @MinLength(2)
    password : string;
}