import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/common/interfaces/user.interfaces';
import { AuthRepository } from './repository';
import { CreateAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    if (createAuthDto.password !== createAuthDto.confirmPassword)
      throw new BadRequestException('error passwords are not same');
    const saltRound = 10;
    const hash = await bcrypt.hash(createAuthDto.password, saltRound);
    if (!hash) throw new BadRequestException('error creating hash');
    const user = await this.authRepository.register({
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
  async login(user: User) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validEmail(email: string) {
    const user = await this.authRepository.findEmail(email);
    return !user;
  }
}
