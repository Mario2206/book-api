import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateReservationDto from './dto/create-reservation.dto';
import { Reservation, ReservationDocument } from './schema/reservation.schema';

@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation.name) private readonly reservationModel : Model<ReservationDocument>) {}

    /**
     * For creating one reservation
     * 
     * @param createReservationDto 
     * @param userId 
     * 
     * @return {Promise<ReservationDocument>}
     */
    async createOne(createReservationDto : CreateReservationDto, userId : string) {
        const currentReservationsOfUser = await this.findCurrentReservationsFromUser(userId)

        if(currentReservationsOfUser.length >= 3) {
            throw new BadRequestException("You can't have more than 3 open reservations")
        }

        const currentReservationOfBook = await this.findCurrentReservationsOfBook(createReservationDto.book)

        if(currentReservationOfBook.length > 0) {
            throw new BadRequestException("The wanted book is already reserved")
        }

        const reservation = new this.reservationModel({...createReservationDto, user : userId})
        return reservation.save()
    }

    /**
     * For finding a reservation which is still open (without return date) of the current user
     * 
     * @param userId 
     * @param bookId 
     * 
     * @returns {Promise<Reservation[]>}
     */
    async findCurrentReservationsFromUser(userId : string) : Promise<ReservationDocument[]> {
        return this.reservationModel.find()
                .where("user", userId)
                .where("returnAt", null)
                .populate("book")
                .exec()
    }
    /**
     * For finding current reservation of a book among all user
     * 
     * @param bookId
     * 
     * @returns {Promise<Reservation[]>} 
     */
    async findCurrentReservationsOfBook(bookId : string) : Promise<ReservationDocument[]> {
        return this.reservationModel.find()
                .where("book", bookId)
                .where("returnAt", null)
                .exec()
    }

    /**
     * For closing one reservation
     * 
     * @param userId 
     * @param reservationId 
     * 
     * @return {Promise<ReservationDocument>}
     */
    async closeOne(userId : string, reservationId : string) : Promise<ReservationDocument> {        
        const updateData = await this.reservationModel.findOneAndUpdate({ _id : reservationId}, {returnAt : new Date()}, {new: true, useFindAndModify : true})
            .where("user", userId)
            .where("returnAt", null)
            .exec()
        return updateData
    }
}
