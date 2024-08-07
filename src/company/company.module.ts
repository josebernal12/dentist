import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { CompanyRepository } from './repository/company.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/repository/auth.repository';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, AuthRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]),
    AuthModule,
  ],
  exports: [CompanyRepository, AuthRepository],
})
export class CompanyModule {}
