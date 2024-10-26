import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/decorators/auth/rol-protected.decorator';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { UserEntity } from 'src/entities/users/user.entity';
import { ROLES } from 'src/enums/rolUser/role.interface';

@Injectable()
export class UserRolGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user as UserEntity;
    const userRole: string = user.userRole.name;

    if (roles.length <= 0 || !roles) {
      return true;
    }

    if (!user) throw new ForbiddenException('User not found');

    for (const rol of roles) {
      if (rol === userRole) {
        return true;
      }
    }

    throw new UnauthorizedException(
      'You do not have the required permissions.',
    );
  }
}
