import { TagModel } from '../tags/Tag.model';
import { UserPostModel } from '../users/Post-User.model';

export class PostModel {
  constructor(
    id: bigint,
    title: string,
    tags: TagModel[],
    dateCreate: Date,
    userCreator: UserPostModel,
    commentsCount: number,
    likesCount: number,
  ) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.dateCreate = dateCreate;
    this.userCreator = userCreator;
    this.commentsCount = commentsCount;
    this.likesCount = likesCount;
  }

  public id: bigint;
  public title: string;
  public tags: TagModel[];
  public dateCreate: Date;
  public userCreator: UserPostModel;
  public commentsCount: number;
  public likesCount: number;
}
