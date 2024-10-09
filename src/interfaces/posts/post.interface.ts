import { PostTagEntity } from 'src/entities/tags/post.tag.entity';
import { UserEntity } from 'src/entities/users/user.entity';

export interface IPost {
  contentPost: string;
  userCreator: UserEntity;
  tags: PostTagEntity[];
}
