import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @IsString()
    @MinLength(2)
    @ApiProperty({
        description : "Username of the new user",
        minLength : 2
    })
    username : string;

    @IsEmail()
    @ApiProperty({
        description : "Mail of the new User"
    })
    mail : string

    @IsString()
    @MinLength(5)
    @ApiProperty({
        description : "Password of the new user",
        minLength : 5
    })
    password : string;
}