import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/constant/role.enum';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags("Books")
@Controller('books')
export class BookController {
    constructor(
        private readonly bookService : BookService
    ) {}

    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async createBook(@Body() createBookDto : CreateBookDto) {
        return this.bookService.createOne(createBookDto)
    }

    @Delete(":bookId")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async removeBook(@Param() param) {
        const deletedBook = await  this.bookService.deleteOne(param.bookId)
        
        if(!deletedBook) {
            throw new NotFoundException()
        }
        return deletedBook
    }

    @Get()
    async getAllBooks() {
        const books = await this.bookService.findAll()
        if(books.length === 0) {
            throw new NotFoundException()
        }
        return books
    }

    @Get(":bookId")
    async getBook(@Param() params) {
        const book = await this.bookService.findOne(params.bookId)
        
        if(!book) {
            throw new NotFoundException()
        }
        return book
    }
}
