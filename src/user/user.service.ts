import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/constant/role.enum';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,
        @Inject("bcrypt") private bcrypt 
        ){}
    
    /**
     * Find one user
     * 
     * @param {string} username 
     * 
     * @return {Promise<UserDocument>}
     */
    async findOne(username : string) {
        return this.userModel.findOne({username}).exec()
    }

    /**
     * Save a new user
     * 
     * @param {RegisterDto} registerDto 
     * @param {Role} role
     * 
     * @return {Promise<UserDocument>}
     */
    async register(registerDto : RegisterDto, role : Role = Role.User) {
        registerDto.password = await this.bcrypt.hash(registerDto.password, 10)
        const user = new this.userModel({...registerDto, role})
        await user.validate() 
        const newUser = await user.save()
        newUser.password = null 
        return newUser
    }

}
