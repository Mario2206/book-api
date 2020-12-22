import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,
        @Inject("bcrypt") private bcrypt 
        ){}
    
    async findOne(username : string) {
        return this.userModel.findOne({username}).exec()
    }

    async register(registerDto : RegisterDto) {
        registerDto.password = await this.bcrypt.hash(registerDto.password, 10)
        const user = new this.userModel({...registerDto, role : "User"})
        await user.validate() 
        return user.save()
    }

}
