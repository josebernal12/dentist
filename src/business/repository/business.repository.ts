import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from '../entities/business.entity';
import { Model } from 'mongoose';
import { IBusinessRepository } from './';

export class BusinessRepository implements IBusinessRepository {
  constructor(
    @InjectModel(Business.name)
    private businessModel: Model<BusinessDocument>,
  ) {}
  async findAll(): Promise<BusinessDocument[]> {
    return await this.businessModel.find();
  }
}
