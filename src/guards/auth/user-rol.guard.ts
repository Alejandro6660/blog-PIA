import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/decorators/auth/rol-protected.decorator';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { UserEntity } from 'src/entities/users/user.entity';

@Injectable()
export class UserRolGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /*     const validLevels: string = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserEntity;
    const rol = user.userRole as RolUserEntity;
    if (!user) throw new BadRequestException('User not found.');
    const level = rol.level;

      for (let validRole of validLevels) {
        if (Number(level) >= ) {
          return true;
        }
      }
    throw new UnauthorizedException(
      'You do not have the required permissions.',
    ); */

    const isPublic = this.reflector.get<boolean>(
      META_ROLES,
      context.getHandler(),
    );
    console.log(isPublic);
    return true;
  }
}
