import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Book } from "src/book/schema/book.schema";
import * as mongoose from "mongoose"
import { User } from "src/user/schema/user.schema";

export type ReservationDocument = Reservation & mongoose.Document 

@Schema()
export class Reservation {

    @Prop({ required : true })
    beginAt : Date

    @Prop({default : null})
    returnAt : Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required : true})
    book : Book

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref : 'User', required : true})
    user : User
}

export const  ReservationSchema = SchemaFactory.createForClass(Reservation)