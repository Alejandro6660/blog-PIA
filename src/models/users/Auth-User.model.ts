import { CatalogoRolUserModel } from '../rolUsers/Catalogo-RolUser.model';

export class AuthUserModel {
  constructor(
    id: bigint,
    name: string,
    userName: string,
    lastName: string,
    email: string,
    rolUser: CatalogoRolUserModel,
    imgAvatar: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.rolUser = rolUser;
    this.imgAvatar = imgAvatar;
  }
  id: bigint;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  rolUser: CatalogoRolUserModel;
  imgAvatar: string;
}
