import { CatalogoRolUserModel } from '../rolUsers/Catalogo-RolUser.model';
import { LinkModel } from './link.model';

export class GetClientUserModel {
  constructor(
    id: bigint,
    name: string,
    userName: string,
    lastName: string,
    email: string,
    postCount: number,
    links: LinkModel[],
    hero: string,
    avatar: string,
    commentCount: number,
  ) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.lastName = lastName;
    this.email = email;
    this.postCount = postCount;
    this.links = links;
    this.hero = hero;
    this.avatar = avatar;
    this.avatar = avatar;
    this.commentCount = commentCount;
  }

  id: bigint;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  postCount: number;
  links: LinkModel[];
  hero: string;
  avatar: string;
  commentCount: number;
}
