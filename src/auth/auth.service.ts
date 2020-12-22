import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService : JwtService,
        @Inject("bcrypt") private bcrypt
        ){}

    async validateUser(username : string, password : string) {
        const user = await this.userService.findOne(username)
        if(user) {
            const pass = await this.bcrypt.compare(password, user.password)
            if(pass) {
                user.password = null
                return user
            }
        }
        return null
    }

    async login(user : UserDocument) {
        const payload = { username : user.username, sub: user._id};
        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}
