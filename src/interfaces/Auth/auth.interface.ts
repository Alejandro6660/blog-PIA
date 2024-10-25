import { UserEntity } from 'src/entities/users/user.entity';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { UserModel } from 'src/models/users/User.model';

export interface AuthResponse {
  accessToken: string;
  user: UserModel;
}

export interface PayloadToken {
  sub: string;
  role: string;
}
