import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { ReservationModule } from './reservation/reservation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseErrorFilter } from './common/filter/mongoose-error.filter';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal : true,
        cache : true
      }),
      AuthModule,
      UserModule,
      BookModule, 
      ReservationModule,
      MongooseModule.forRoot(process.env.DB_URL),
      SeedModule
  ],
  controllers: [AppController],
  providers: [{provide : APP_FILTER, useClass : MongooseErrorFilter}],
})
export class AppModule {}
