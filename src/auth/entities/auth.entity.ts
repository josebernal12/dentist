import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  lastName: string;

  @Prop({ required: true, trim: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, trim: true, type: String })
  password: string;

  @Prop({
    required: true,
    trim: true,
    enum: ['free', 'premium'],
    default: 'free',
    type: String,
  })
  version: string;

  @Prop({ type: String, default: null })
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  companyId: unknown;

  @Prop({ type: Boolean, default: false })
  suspended: Boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
