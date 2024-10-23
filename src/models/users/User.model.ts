import { RolUserModel } from '../rolUsers/RolUser.model';

export class UserModel {
  constructor(
    name: string,
    userName: string,
    lastName: string,
    email: string,
    rolUser: string,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.rolUser = rolUser;
  }
  name: string;
  userName: string;
  lastName: string;
  email: string;
  rolUser: string;
}
