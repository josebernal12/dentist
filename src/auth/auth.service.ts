import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/common/interfaces/user.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    if (createAuthDto.password !== createAuthDto.confirmPassword)
      throw new BadRequestException();
    const saltRound = 10;
    const hash = await bcrypt.hash(createAuthDto.password, saltRound);
    if (!hash) throw new BadRequestException('error creating hash');
    const user = await this.authRepository.create({
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
  //TODO AGREGAR QUERYS
  async findAll(companyId: string) {
    const users = await this.authRepository.findAll(companyId);
    if (!users) throw new NotFoundException('error getting users');
    return users;
  }

  async findOne(id: string, companyId: string) {
    const user = await this.authRepository.findById(id);
    if (!user) throw new NotFoundException('error getting user');
    if (user.companyId !== companyId)
      throw new UnauthorizedException('you dont have permissions');
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto, companyId: string) {
    if (Object.keys(updateAuthDto).length === 0)
      throw new BadRequestException('object is empty');
    await this.findOne(id, companyId);
    const user = await this.authRepository.update(id, updateAuthDto);
    if (!user) throw new NotFoundException('error updating user');
    return user;
  }

  async remove(id: string, companyId: string) {
    await this.findOne(id, companyId);
    const user = await this.authRepository.delete(id);
    if (!user) throw new NotFoundException('error deleting user');
    return user;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validEmail(email: string) {
    const user = await this.authRepository.findEmail(email)
    return !user
  }
}
