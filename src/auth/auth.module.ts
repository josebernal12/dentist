import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';
import { AuthRepository } from './repository/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';
import { IsEmailUniqueConstraint } from './decorator/is-unique-email.decorator';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy, IsEmailUniqueConstraint],
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule,
  ],
  exports: [
   // AuthRepository,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    IsEmailUniqueConstraint
  ],
})
export class AuthModule {}
