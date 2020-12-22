import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { LoginDto } from './user/dto/login.dto';
import { RegisterDto } from './user/dto/register.dto';
import { UserDocument } from './user/schema/user.schema';
import { UserService } from './user/user.service';

@ApiTags("App")
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService : AuthService
    ) {}

    /**
     * Login
     * 
     * @param req 
     * 
     * @return {{access_token: string}}
     */
    @UseGuards(LocalAuthGuard)
    @Post("auth/login")
    @HttpCode(HttpStatus.OK)
    @ApiBody({
      description : "Login",
      type: LoginDto
    })
    @ApiResponse({status : HttpStatus.OK, description : "The user is authentified"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description : "The user isn't authentified"})
    login (@Request() req ) {
      return this.authService.login(req.user)
    }

    /**
     * Register
     * 
     * @param registerDto 
     * 
     * @return {Promise<UserDocument>}
     */
    @Post("auth/register")
    @ApiResponse({status : HttpStatus.CREATED, description : "The user is registered"})
    @ApiResponse({status : HttpStatus.BAD_REQUEST, description: "The user is not registered because of the request"})
    async register(@Body() registerDto : RegisterDto) { 
      return this.userService.register(registerDto)
    }

}
