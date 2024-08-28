import { Auth, AuthDocument } from 'src/auth/entities/auth.entity';
import { IUserRepository } from './';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto, UpdateAuthDto } from 'src/auth/dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
  ) {}
  async findAll(companyId: string): Promise<AuthDocument[]> {
    return await this.authModel.find({ companyId }).select('-password');
  }
  async findById(id: string): Promise<AuthDocument | null> {
    return await this.authModel.findById(id).select('-password');
  }
  async create(auth: CreateAuthDto): Promise<AuthDocument> {
    return await this.authModel.create(auth);
  }
  async update(id: string, auth: UpdateAuthDto): Promise<AuthDocument | null> {
    return await this.authModel.findByIdAndUpdate(id, auth, { new: true }).select('-password');
  }
  async delete(id: string): Promise<AuthDocument | null> {
    return await this.authModel.findByIdAndDelete(id, { new: true }).select('-password');
  }
}
