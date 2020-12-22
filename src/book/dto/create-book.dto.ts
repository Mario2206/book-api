import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description : "Book title",
        minLength : 1
    })
    title: string;
}