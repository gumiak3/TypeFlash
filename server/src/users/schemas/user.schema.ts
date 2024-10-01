import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'employee'],
  })
  role: 'user' | 'admin' | 'employee';
}

export const UserSchema = SchemaFactory.createForClass(User);
