import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/constant/role.enum";
import { UserService } from "src/user/user.service";
import { ROLES_KEY } from "../decorator/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService : UserService
        ) {}

    async canActivate(context : ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if(!requiredRoles) {
            return true 
        }

        const { user } = context.switchToHttp().getRequest()
        
        const userEntity = await this.userService.findOne(user.username)

        const isAuth = requiredRoles.some(role => userEntity.role?.includes(role))

        if(!isAuth) {
            throw new UnauthorizedException()
        }
        return true
    }

    
}