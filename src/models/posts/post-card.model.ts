import { TagModel } from '../tags/Tag.model';
import { UserPostModel } from '../users/Post-User.model';

export class PostCardModel {
  constructor(
    id: bigint,
    title: string,
    tags: TagModel[],
    dateCreate: Date,
    userCreator: UserPostModel,
    content: string,
  ) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.dateCreate = dateCreate;
    this.userCreator = userCreator;
    this.content = content;
  }

  public id: bigint;
  public title: string;
  public tags: TagModel[];
  public dateCreate: Date;
  public content: string;
  public userCreator: UserPostModel;
}
