import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RolProtected } from './rol-protected.decorator';
import { UserRolGuard } from 'src/guards/auth/user-rol.guard';
import { ROLES } from 'src/enums/rolUser/role.interface';

export function Auth(...roles: ROLES[]) {
  return applyDecorators(
    RolProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRolGuard),
  );
}
