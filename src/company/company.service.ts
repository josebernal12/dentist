import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repository';
import { CompanyRepository } from './repository';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto, userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestException('user with that id not exist');
    if (user.companyId)
      throw new BadRequestException('company already exist with that user');
    const existEmail = await this.companyRepository.findOne(
      createCompanyDto.email,
    );
    if (existEmail) throw new BadRequestException('email already exist');
    const company = await this.companyRepository.create(createCompanyDto);
    if (!company) throw new NotFoundException('error creating company');
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
