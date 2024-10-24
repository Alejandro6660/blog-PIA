import { SetMetadata } from '@nestjs/common';
import { rolUserProtectedEnum } from 'src/enums/rolUser/rolUserProtected.enum';

export const META_ROLES = 'roles';

export const RolProtected = (...args: rolUserProtectedEnum[]) => {
  return SetMetadata(META_ROLES, args);
};
