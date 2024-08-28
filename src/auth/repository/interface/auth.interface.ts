import { CreateAuthDto } from 'src/auth/dto';
import { AuthDocument } from 'src/auth/entities/auth.entity';

export interface IAuthRepository {
  findEmail(email: string): Promise<AuthDocument | null>;
  register(auth: CreateAuthDto): Promise<AuthDocument>;
  // login(email: string, password: string): Promise<AuthDocument>;
}
