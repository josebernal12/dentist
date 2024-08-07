import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { Auth, AuthDocument } from '../entities/auth.entity';
import { IAuthRepository } from './interface/auth.interface';
import { Model } from 'mongoose';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
  ) {}

  findAll(companyId: string): Promise<AuthDocument[]> {
    return this.authModel.find({ companyId });
  }
  findById(id: string): Promise<AuthDocument | null> {
    return this.authModel.findById(id);
  }
  create(auth: CreateAuthDto): Promise<AuthDocument> {
    return this.authModel.create(auth);
  }
  update(id: string, auth: UpdateAuthDto): Promise<AuthDocument | null> {
    return this.authModel.findByIdAndUpdate(id, auth, { new: true });
  }
  delete(id: string): Promise<AuthDocument | null> {
    return this.authModel.findByIdAndDelete(id, { new: true });
  }
  findEmail(email: string): Promise<AuthDocument | null> {
    return this.authModel.findOne({ email });
  }
}
