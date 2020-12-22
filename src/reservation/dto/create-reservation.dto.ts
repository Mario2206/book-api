import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsMongoId, IsNotEmpty } from "class-validator"

export default class CreateReservationDto {
    @IsDateString()
    @ApiProperty({
        description : "The beginning date of the reservation"
    })
    beginAt : Date 

    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({
        description : "The book id which is reserved"
    })
    book : string
}