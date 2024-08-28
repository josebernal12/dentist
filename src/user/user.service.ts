import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repository';
import { CreateAuthDto, UpdateAuthDto } from 'src/auth/dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createAuthDto: CreateAuthDto) {
    if (createAuthDto.password !== createAuthDto.confirmPassword)
      throw new BadRequestException();
    const saltRound = 10;
    const hash = await bcrypt.hash(createAuthDto.password, saltRound);
    if (!hash) throw new BadRequestException('error creating hash');
    const user = await this.userRepository.create({
      ...createAuthDto,
      password: hash,
    });
    if (!user) throw new BadRequestException('error creating user');
    const userWithoutPassword: CreateAuthDto = user.toObject();
    delete userWithoutPassword.password;
    return {
      user: userWithoutPassword,
    };
  }
  async findAll(companyId: string) {
    const users = await this.userRepository.findAll(companyId);
    if (!users) throw new NotFoundException('error getting users');
    return users;
  }

  async findOne(id: string, companyId: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('error getting user');
    if (user.companyId !== companyId)
      throw new UnauthorizedException('you dont have permissions');
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto, companyId: string) {
    if (Object.keys(updateAuthDto).length === 0)
      throw new BadRequestException('object is empty');
    await this.findOne(id, companyId);
    const user = await this.userRepository.update(id, updateAuthDto);
    if (!user) throw new NotFoundException('error updating user');
    return user;
  }

  async remove(id: string, companyId: string) {
    await this.findOne(id, companyId);
    const user = await this.userRepository.delete(id);
    if (!user) throw new NotFoundException('error deleting user');
    return user;
  }
}
