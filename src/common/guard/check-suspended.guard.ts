import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@Injectable()
export class CheckAccountSuspendedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    // Si el controlador o método está marcado para omitir la verificación de suspensión
    const skipCheckAccountSuspended = this.reflector.getAllAndOverride<boolean>(
      'skipCheckAccountSuspended',
      [context.getHandler(), context.getClass()],
    );

    if (skipCheckAccountSuspended) {
      return true; // Permitir la solicitud sin verificar la suspensión
    }

    // Realizar la verificación de suspensión si no está marcado para omitir
    if (request.user.suspended) {
      throw new BadRequestException('Account is suspended');
    }

    return true;
  }
}
