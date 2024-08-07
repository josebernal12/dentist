import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Company, CompanyDocument } from '../entities/company.entity';
import { ICompanyRepository } from './interface/company.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectModel(Company.name)
    private compayModel: Model<CompanyDocument>,
  ) {}
  findAll(): Promise<CompanyDocument[]> {
    return this.compayModel.find();
  }
  findById(id: string): Promise<CompanyDocument | null> {
    return this.compayModel.findById(id);
  }
  create(company: CreateCompanyDto): Promise<CompanyDocument> {
    return this.compayModel.create(company);
  }
  update(id: string, company: UpdateAuthDto): Promise<CompanyDocument | null> {
    return this.compayModel.findByIdAndUpdate(id, company, { new: true });
  }
  delete(id: string): Promise<CompanyDocument | null> {
    return this.compayModel.findByIdAndDelete(id, { new: true });
  }
}
