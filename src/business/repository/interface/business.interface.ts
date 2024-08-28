import { BusinessDocument } from 'src/business/entities/business.entity';

export interface IBusinessRepository {
  findAll(): Promise<BusinessDocument[]>;
}
