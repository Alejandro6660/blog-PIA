import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { rolUserProtectedEnum } from 'src/enums/rolUser/rolUserProtected.enum';
import { RolProtected } from './rol-protected.decorator';
import { UserRolGuard } from 'src/guards/auth/user-rol.guard';

export function Auth(...roles: rolUserProtectedEnum[]) {
  return applyDecorators(
    UseGuards(AuthGuard(), UserRolGuard),
    RolProtected(...roles),
  );
}
