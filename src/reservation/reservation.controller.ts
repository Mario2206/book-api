import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BookService } from 'src/book/book.service';
import CreateReservationDto from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags("Reservation")
@UseGuards(JwtAuthGuard)
@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService : ReservationService,
        private readonly bookService : BookService
    ){}


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiResponse({status : HttpStatus.CREATED, description : "New reservation"})
    async createReservation(@Body() createReservationDto : CreateReservationDto, @Request() req ) {
        const book = await this.bookService.findOne(createReservationDto.book)
        if(!book) {
            throw new BadRequestException()
        }
        return this.reservationService.createOne(createReservationDto, req.user.userId)
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({status : HttpStatus.OK, description : "All current reservations of the current user"})
    async getUserReservations(@Request() req) {
        return this.reservationService.findCurrentReservationsFromUser(req.user.userId)
    }

    @Put(":reservationId")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiParam({name : "reservationId", required : true})
    async closeReservation(@Param() params ,@Request() req) {        
        return this.reservationService.closeOne(req.user.userId, params.reservationId)
    }
}
