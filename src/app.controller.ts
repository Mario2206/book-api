import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { MongooseErrorFilter } from './common/filter/mongoose-error.filter';
import { LoginDto } from './user/dto/login.dto';
import { RegisterDto } from './user/dto/register.dto';
import { UserService } from './user/user.service';

@ApiTags("App")
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService : AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description : "Login",
    type: LoginDto
  })
  async login (@Request() req ) {
    return this.authService.login(req.user)
  }

  @UseFilters(new MongooseErrorFilter())
  @Post("auth/register")
  async register(@Body() registerDto : RegisterDto) { 

    return this.userService.register(registerDto)
  }

}
