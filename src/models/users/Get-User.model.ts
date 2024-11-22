import { CatalogoRolUserModel } from '../rolUsers/Catalogo-RolUser.model';
import { LinkModel } from './link.model';

export class GetUserAdmin {
  constructor(
    id: bigint,
    name: string,
    userName: string,
    lastName: string,
    email: string,
    rolUser: CatalogoRolUserModel,
    postCount: number,
    links: LinkModel[],
    hero: string,
    avatar: string,
  ) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.lastName = lastName;
    this.email = email;
    this.rolUser = rolUser;
    this.postCount = postCount;
    this.links = links;
    this.hero = hero;
    this.avatar = avatar;
  }

  id: bigint;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  rolUser: CatalogoRolUserModel;
  postCount: number;
  links: LinkModel[];
  hero: string;
  avatar: string;
}
