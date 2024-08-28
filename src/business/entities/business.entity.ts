import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BusinessDocument = Business & Document;

@Schema({ timestamps: true })
export class Business {
  @Prop({ required: true, trim: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  icon: string;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
