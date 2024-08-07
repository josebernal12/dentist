import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { CompanyDocument } from 'src/company/entities/company.entity';

export interface ICompanyRepository {
  findAll(): Promise<CompanyDocument[]>;
  findById(id: string): Promise<CompanyDocument | null>;
  create(company: CreateCompanyDto): Promise<CompanyDocument>;
  update(id: string, company: UpdateAuthDto): Promise<CompanyDocument | null>;
  delete(id: string): Promise<CompanyDocument | null>;
}
