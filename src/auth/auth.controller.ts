import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongoId.pipe';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './passport';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import { SkipCheckAccountSuspendedGuard } from 'src/common/guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(SkipCheckAccountSuspendedGuard)
  @SetMetadata('skipCheckAccountSuspended', true)
  @Post()
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.userService.findAll(req.user.companyId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseMongoIdPipe) id: string,
    @Request() req: RequestWithUser,
  ) {
    return this.userService.findOne(id, req.user.companyId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAuthDto: UpdateAuthDto,
    @Request() req: RequestWithUser,
  ) {
    return this.userService.update(id, updateAuthDto, req.user.companyId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @Request() req: RequestWithUser,
  ) {
    return this.userService.remove(id, req.user.companyId);
  }
}
