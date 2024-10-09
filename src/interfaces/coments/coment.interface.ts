import { PostEntity } from 'src/entities/posts/post.entity';
import { UserEntity } from 'src/entities/users/user.entity';

export interface IComent {
  post: PostEntity;
  userCreator: UserEntity;
  content: string;
}
