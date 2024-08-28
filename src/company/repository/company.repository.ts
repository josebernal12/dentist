import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { Company, CompanyDocument } from '../entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICompanyRepository } from './';
import { CreateCompanyDto } from '../dto';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  findAll(): Promise<CompanyDocument[]> {
    return this.companyModel.find();
  }
  findById(id: string): Promise<CompanyDocument | null> {
    return this.companyModel.findById(id);
  }
  create(company: CreateCompanyDto): Promise<CompanyDocument> {
    return this.companyModel.create(company);
  }
  update(id: string, company: UpdateAuthDto): Promise<CompanyDocument | null> {
    return this.companyModel.findByIdAndUpdate(id, company, { new: true });
  }
  delete(id: string): Promise<CompanyDocument | null> {
    return this.companyModel.findByIdAndDelete(id, { new: true });
  }
  findOne(email: string): Promise<CompanyDocument | null> {
    return this.companyModel.findOne({ email });
  }
}
