import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BookService } from 'src/book/book.service';
import { EmptyInterceptor } from 'src/common/interceptor/empty.interceptor';
import { ParseMongoIdPipe } from 'src/common/pipe/parse-mongo-id.pipe';
import CreateReservationDto from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { ReservationDocument } from './schema/reservation.schema';

@ApiTags("Reservation")
@UseGuards(JwtAuthGuard)
@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService : ReservationService,
        private readonly bookService : BookService
    ){}

    /**
     * Create a reservation
     * 
     * @param createReservationDto 
     * @param req 
     * 
     * @return {Promise<ReservationDocument>}
     */
    @Post()
    @ApiBearerAuth()
    @ApiResponse({status : HttpStatus.CREATED, description : "New reservation"})
    @ApiResponse({status : HttpStatus.UNAUTHORIZED, description : "Reservation is impossible without authentication"})
    @ApiResponse({status : HttpStatus.BAD_REQUEST, description : "Problem in reservation"})
    async createReservation(@Body() createReservationDto : CreateReservationDto, @Request() req ) : Promise<ReservationDocument>{
        const book = await this.bookService.findOne(createReservationDto.book)
        if(!book) {
            throw new BadRequestException()
        }
        return this.reservationService.createOne(createReservationDto, req.user.userId)
    }

    /**
     * Get user reservations which are still open
     * 
     * @param req 
     * 
     * @return {Promise<ReservationDocument[]>}
     */
    @Get()
    @UseInterceptors(new EmptyInterceptor())
    @ApiBearerAuth()
    @ApiResponse({status : HttpStatus.OK, description : "All current reservations of the current user"})
    @ApiResponse({status : HttpStatus.NOT_FOUND, description : "No current reservations found"})
    async getUserReservations(@Request() req) : Promise<ReservationDocument[]> {
        return this.reservationService.findCurrentReservationsFromUser(req.user.userId)
    }

    /**
     * Close a reservation
     * 
     * @param reservationId 
     * @param req 
     * 
     * @return {Promise<ReservationDocument>}
     */
    @Put(":reservationId")
    @ApiBearerAuth()
    @ApiParam({name : "reservationId", required : true})
    @ApiResponse({status : HttpStatus.BAD_REQUEST, description : "Problem for closing the reservation"})
    @ApiResponse({status: HttpStatus.OK, description : "The reservation is closed"})
    @ApiResponse({status : HttpStatus.NOT_FOUND, description : "A current reservation with the provided id doesn't exist"})
    async closeReservation(@Param("reservationId", new ParseMongoIdPipe() ) reservationId : string ,@Request() req): Promise<ReservationDocument> {        
        const closeReservation = await this.reservationService.closeOne(req.user.userId, reservationId)
        if(!closeReservation) {
            throw new BadRequestException("The reservation doesn't exist or it has been already closed")
        }
        return closeReservation
    }
}
