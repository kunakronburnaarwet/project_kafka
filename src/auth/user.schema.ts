import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string | undefined;

  @Prop({ required: true })
  password: string | undefined;

  @Prop({ default: Date.now })
  createdAt: Date | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);