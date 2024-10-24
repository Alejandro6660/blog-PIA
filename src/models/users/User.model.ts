import { RolUserModel } from '../rolUsers/RolUser.model';

export class UserModel {
  constructor(
    id: bigint,
    name: string,
    userName: string,
    lastName: string,
    email: string,
    rolUser: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.rolUser = rolUser;
  }
  id: bigint;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  rolUser: string;
}
