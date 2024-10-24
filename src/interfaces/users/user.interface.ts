import { DocumentEntity } from 'src/entities/documents/document.entity';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  description: string;
  validateEmail: boolean;
  imgAvatar: DocumentEntity;
  imgHero: DocumentEntity;
  userRole: RolUserEntity;
}
