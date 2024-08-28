import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport';
import { IsEmailUniqueConstraint } from './decorator/is-unique-email.decorator';
import { UserModule } from 'src/user/user.module';
import { AuthRepository } from './repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    IsEmailUniqueConstraint,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule,
    forwardRef(() => UserModule),
  ],
  exports: [
    MongooseModule,
    // AuthService, // Exporta AuthService para que otros módulos puedan usarlo
    // IsEmailUniqueConstraint, // Exporta el decorador si es necesario
    AuthRepository,
  ],
})
export class AuthModule {}
