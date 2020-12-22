import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import * as mongoose from "mongoose"

export class ParseMongoIdPipe implements PipeTransform {
    transform(value: any, metadata : ArgumentMetadata) {
            
        if(!mongoose.Types.ObjectId.isValid(value)) {
            throw new NotFoundException()
        }

        return value
    }
}