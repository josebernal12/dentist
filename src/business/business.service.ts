import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessRepository } from './repository';
// import { CreateBusinessDto } from './dto/create-business.dto';
// import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly businessRepository: BusinessRepository) {}
  // create(createBusinessDto: CreateBusinessDto) {
  //   return 'This action adds a new business';
  // }

  async findAll() {
    const business = await this.businessRepository.findAll();
    if (!business) throw new NotFoundException('there is not business');
    return business;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} business`;
  // }

  // update(id: number, updateBusinessDto: UpdateBusinessDto) {
  //   return `This action updates a #${id} business`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} business`;
  // }
}
