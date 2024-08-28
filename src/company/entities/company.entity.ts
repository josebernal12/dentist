import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Business } from 'src/business/entities/business.entity';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  email: string;

  @Prop({ required: true, trim: true, type: String })
  address: string;

  @Prop({ required: true, trim: true, type: String })
  phone: string;

  @Prop({ required: true, trim: true, type: String })
  country: string;

  @Prop({ required: true, trim: true, type: mongoose.Schema.Types.ObjectId })
  business: Business;

  @Prop({ trim: true, type: String })
  logo: string;

  @Prop({ trim: true, type: String })
  socialNetwork: string;

  @Prop({ trim: true, type: Date })
  dateService: Date;

  @Prop({ trim: true, type: String })
  description: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
