import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';



@Module({
  imports : [UserModule, PassportModule, JwtModule.registerAsync({
    imports : [ConfigService],
    inject : [ConfigService],
    useFactory: async (configService : ConfigService) => ({
        secret : configService.get("JWT_SECRET"),
        signOptions : { expiresIn : "1h" }
    })
    
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, UserModule]
})
export class AuthModule {}
