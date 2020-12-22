import { Body, Controller, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { MongooseErrorFilter } from './common/filter/mongoose-error.filter';
import { RegisterDto } from './user/dto/register.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService : AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login (@Request() req ) {
    return this.authService.login(req.user)
  }

  @UseFilters(new MongooseErrorFilter())
  @Post("auth/register")
  async register(@Body() registerDto : RegisterDto) {
    return this.userService.register(registerDto)
  }

}
