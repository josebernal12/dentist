import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { AuthDocument } from 'src/auth/entities/auth.entity';

export interface IAuthRepository {
  findAll(companyId: string): Promise<AuthDocument[]>;
  findById(id: string): Promise<AuthDocument | null>;
  create(auth: CreateAuthDto): Promise<AuthDocument>;
  update(id: string, auth: UpdateAuthDto): Promise<AuthDocument | null>;
  delete(id: string): Promise<AuthDocument | null>;
  findEmail(email: string): Promise<AuthDocument | null>;
}
