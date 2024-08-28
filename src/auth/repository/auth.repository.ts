import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../entities/auth.entity';
import { Model } from 'mongoose';
import { IAuthRepository } from './';
import { CreateAuthDto } from '../dto';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
  ) {}
  register(auth: CreateAuthDto): Promise<AuthDocument> {
    return this.authModel.create(auth);
  }
  findEmail(email: string): Promise<AuthDocument | null> {
    return this.authModel.findOne({ email });
  }
}
