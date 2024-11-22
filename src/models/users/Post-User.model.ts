export class UserPostModel {
  constructor(
    id: bigint,
    name: string,
    userName: string,
    lastName: string,
    email: string,
    imgAvatar: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.imgAvatar = imgAvatar;
  }
  id: bigint;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  imgAvatar: string;
}
