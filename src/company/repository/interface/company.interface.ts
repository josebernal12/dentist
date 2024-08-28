import { UpdateCompanyDto, CreateCompanyDto } from 'src/company/dto';
import { CompanyDocument } from 'src/company/entities/company.entity';

export interface ICompanyRepository {
  findAll(): Promise<CompanyDocument[]>;
  findById(id: string): Promise<CompanyDocument | null>;
  create(company: CreateCompanyDto): Promise<CompanyDocument>;
  update(
    id: string,
    company: UpdateCompanyDto,
  ): Promise<CompanyDocument | null>;
  delete(id: string): Promise<CompanyDocument | null>;
  findOne(email: string): Promise<CompanyDocument | null>;
}
