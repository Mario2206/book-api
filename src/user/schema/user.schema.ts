import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import * as uniqueValidator from "mongoose-unique-validator"

export type UserDocument = User & Document;

@Schema() 
export class User {

    @Prop({required : true, unique : true})
    username : string;

    @Prop({required : true, unique : true})
    mail : string

    @Prop({required : true})
    password : string; 

    @Prop({required : true, enum : ["Admin", "User"]})
    role : string

}

export const UserSchema = SchemaFactory.createForClass(User).plugin(uniqueValidator)