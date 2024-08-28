import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from './entities/business.entity';
import { BusinessRepository } from './repository';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService, BusinessRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
    ]),
  ],
})
export class BusinessModule {}
