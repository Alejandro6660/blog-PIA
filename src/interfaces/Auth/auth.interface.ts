import { UserEntity } from 'src/entities/users/user.entity';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { AuthUserModel } from 'src/models/users/Auth-User.model';
import { UserModel } from 'src/models/users/User.model';

export interface AuthResponse {
  accessToken: string;
  user: AuthUserModel;
}

export interface PayloadToken {
  sub: string;
  role: string;
}

export interface AuthTokenResult {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  sub: string;
  role: string;
  isExpired: boolean;
}
