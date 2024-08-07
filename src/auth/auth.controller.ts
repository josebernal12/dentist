import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongoId.pipe';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.authService.findAll(req.user.companyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseMongoIdPipe) id: string,
    @Request() req: RequestWithUser,
  ) {
    return this.authService.findOne(id, req.user.companyId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAuthDto: UpdateAuthDto,
    @Request() req: RequestWithUser,
  ) {
    return this.authService.update(id, updateAuthDto, req.user.companyId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @Request() req: RequestWithUser,
  ) {
    return this.authService.remove(id, req.user.companyId);
  }
}
