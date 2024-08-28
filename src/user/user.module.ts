import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './repository';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
