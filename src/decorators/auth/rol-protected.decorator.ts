import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/enums/rolUser/role.interface';

export const META_ROLES = 'levels';

export const RolProtected = (...args: ROLES[]) => {
  return SetMetadata(META_ROLES, args);
};
