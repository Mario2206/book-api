import { Command } from "nestjs-command"
import { Injectable } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { Role } from "src/constant/role.enum"

@Injectable()
export class UserSeed {
    constructor(
        private readonly userService : UserService
    ) {}

    @Command({command : 'create:users', describe : "Create some users", autoExit : true})
    async createUsers() {
        let user = await this.userService.register({
            username : "Admin555",
            mail : "admin@mail.com",
            password : "password2206"
        }, Role.Admin)

        console.log(user);

        user = await this.userService.register({
            username : "Test111",
            mail : "test@mail.com",
            password : "password2206"
        })

        console.log(user);
        
        
    }
}