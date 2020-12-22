import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel : Model<BookDocument>
    ) {}
    
    /**
     * Create one book
     * 
     * @param createBookDto 
     * 
     * @return {Promise<BookDocument>}
     */
    async createOne(createBookDto : CreateBookDto) {
        const book = new this.bookModel(createBookDto)
        return book.save()
    }

    /**
     * Removeone book
     * 
     * @param bookId 
     * 
     * @return {Promise<BookDocument>}
     */
    async deleteOne(bookId : string) {
        return this.bookModel.findByIdAndDelete(bookId).exec()
    }

    /**
     * Get all books
     * 
     * @return {Promise<BookDocument[]>}
     */
    async findAll() : Promise<BookDocument[]> {
        return this.bookModel.find().exec()
    }

    /**
     * Get only one book
     * 
     * @param bookId 
     * 
     * @return {Promise<BookDocument>}
     */
    async findOne(bookId : string) : Promise<BookDocument> {
        return this.bookModel.findById(bookId).exec()
    }
}
