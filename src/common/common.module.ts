// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/repository/auth.repository';

@Module({
  imports: [AuthModule],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class CommonModule {}
