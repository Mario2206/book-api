import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BookModule } from 'src/book/book.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schema/reservation.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{name : Reservation.name, schema : ReservationSchema}]),
    AuthModule,
    BookModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
