import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}