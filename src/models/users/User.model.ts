import { CatalogoRolUserModel } from '../rolUsers/Catalogo-RolUser.model';

export class UserModel {
  constructor(
    id: bigint,
    name: string,
    userName: string,
    lastName: string,
    email: string,
    rolUser: CatalogoRolUserModel,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.rolUser = rolUser;
  }
  id: bigint;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  rolUser: CatalogoRolUserModel;
}
