import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Error } from 'mongoose';
import { Request, Response } from 'express';

@Catch(Error)
export class MongooseErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        statusCode: HttpStatus.BAD_REQUEST,
        message : exception.message,
        error: "Bad request"
      });
  }
}