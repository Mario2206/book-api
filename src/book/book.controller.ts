import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { EmptyInterceptor } from 'src/common/interceptor/empty.interceptor';
import { ParseMongoIdPipe } from 'src/common/pipe/parse-mongo-id.pipe';
import { Role } from 'src/constant/role.enum';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument } from './schema/book.schema';

@ApiTags("Books")
@Controller('books')
export class BookController {
    constructor(
        private readonly bookService : BookService
    ) {}
    
    /**
     * (ADMIN) Create a new book
     * 
     * @param createBookDto 
     * 
     * @return {BookDocument}
     */
    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiResponse({ status : HttpStatus.CREATED, description : "Book is created"})
    @ApiResponse({status : HttpStatus.BAD_REQUEST, description : "Book isn't created because of the request"})
    async createBook(@Body() createBookDto : CreateBookDto) {
        return this.bookService.createOne(createBookDto)
    }

    /**
     * (ADMIN) Remove a book
     * 
     * @param bookId 
     * 
     * @return {BookDocument}
     */
    @Delete(":bookId")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(new EmptyInterceptor())
    @ApiBearerAuth()
    @ApiParam({name: "bookId", description: "Book id"})
    @ApiResponse({ status : HttpStatus.NOT_FOUND, description : "The book doesn't exist"})
    @ApiResponse({status : HttpStatus.UNAUTHORIZED, description : "The user hasn't the persimission to remove the book"})
    @ApiResponse({ status : HttpStatus.OK, description: "The book has been removed"})
    async removeBook(@Param("bookId", new ParseMongoIdPipe()) bookId) {
        return this.bookService.deleteOne(bookId)
    }

    /**
     * Get all books
     * 
     * @return {BookDocument[]}
     */
    @Get()
    @UseInterceptors(new EmptyInterceptor())
    @ApiResponse({status : HttpStatus.OK, description : "Books have been found"})
    @ApiResponse({status : HttpStatus.NOT_FOUND, description : "No book has been found"})
    async getAllBooks() {
        return this.bookService.findAll()
    }

    /**
     * Get only one book
     * 
     * @param bookId 
     * 
     * @return {BookDocument}
     */
    @Get(":bookId")
    @UseInterceptors(new EmptyInterceptor())
    @ApiParam({name: "bookId", description : "book id"})
    @ApiResponse({status: HttpStatus.OK, description : "The book has been found"})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description : "Not book has been found"})
    async getBook(@Param("bookId", new ParseMongoIdPipe()) bookId) {
        return this.bookService.findOne(bookId)  
    }
}
