import { CreateAuthDto, UpdateAuthDto } from 'src/auth/dto';
import { AuthDocument } from 'src/auth/entities/auth.entity';

export interface IUserRepository {
  findAll(companyId: string): Promise<AuthDocument[]>;
  findById(id: string): Promise<AuthDocument | null>;
  create(auth: CreateAuthDto): Promise<AuthDocument>;
  update(id: string, auth: UpdateAuthDto): Promise<AuthDocument | null>;
  delete(id: string): Promise<AuthDocument | null>;
}
