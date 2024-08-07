import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './repository/company.repository';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto, userId: string) {
    const company = await this.companyRepository.create(createCompanyDto);
    if (!company) throw new NotFoundException('error creating company');
    const user = await this.authRepository.findById(userId);
    if (!user) throw new NotFoundException('error getting user');
    user.companyId = company._id;
    await user.save();
    const payload = {
      sub: user._id,
      username: user.name,
      companyId: user.companyId,
    };
    const token = this.jwtService.sign(payload);
    return {
      company,
      token,
    };
  }

  async findAll() {
    const companies = await this.companyRepository.findAll();
    if (!companies) throw new NotFoundException('error getting companies');
    return companies;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('id necessary');
    const company = await this.companyRepository.findById(id);
    if (!company) throw new NotFoundException('error getting a company');
    return 'company obtained';
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);
    const company = await this.companyRepository.update(id, updateCompanyDto);
    if (!company) throw new NotFoundException('error updating company');
    return company;
  }

  async remove(id: string) {
    await this.findOne(id);
    const company = await this.companyRepository.delete(id);
    if (!company) throw new NotFoundException('error deleting company');
    return company;
  }
}
