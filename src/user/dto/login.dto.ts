import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {

    @ApiProperty({
        description : "Username of user"
    })
    username : string

    @ApiProperty({
        description : "Passsword of user"
    })
    password : string
}