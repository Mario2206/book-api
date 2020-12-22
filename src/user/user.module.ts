import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import * as bcrypt from "bcrypt"

@Module({
  imports : [MongooseModule.forFeature([{name : User.name, schema : UserSchema}])],
  providers: [UserService, {provide : "bcrypt", useValue : bcrypt}],
  exports : [UserService, {provide : "bcrypt", useValue : bcrypt}]
})
export class UserModule {}
