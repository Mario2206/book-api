import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type BookDocument = Book & Document

@Schema()
export class Book {
    @Prop({required: true})
    title: string;
}

export const BookSchema = SchemaFactory.createForClass(Book)