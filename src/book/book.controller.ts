import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
    constructor(
        private readonly bookService : BookService
    ) {}

    @Post()
    @UseGuards(new JwtAuthGuard())
    async createBook(@Body() createBookDto : CreateBookDto) {
        return this.bookService.createOne(createBookDto)
    }
}
