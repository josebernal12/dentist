import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongoId.pipe';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { SkipCheckAccountSuspendedGuard } from 'src/common/guard';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
  ) {}

  @UseGuards(SkipCheckAccountSuspendedGuard)
  @SetMetadata('skipCheckAccountSuspended',true)
  @Post('/:id')
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Param('id', ParseMongoIdPipe) userId: string,
  ) {
    return this.companyService.create(createCompanyDto, userId);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.companyService.remove(id);
  }
}
