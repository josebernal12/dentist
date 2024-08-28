import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CompanyRepository } from './repository';
import { AuthRepository } from 'src/auth/repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    AuthRepository,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    AuthModule,
    UserModule,
    CommonModule
  ],
  exports: [CompanyRepository, AuthRepository],
})
export class CompanyModule {}
