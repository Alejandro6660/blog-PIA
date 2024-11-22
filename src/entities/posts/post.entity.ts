import { BaseEntity } from '../../common/base.entity';
import { IPost } from '../../interfaces/posts/post.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ComentEntity } from '../coments/coment.entity';
import { PostTagEntity } from '../tags/post.tag.entity';
import { LikeEntity } from './like.user.post.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity implements IPost {
  @Column({ name: 'title_post', type: 'varchar', nullable: false })
  titlePost: string;

  @Column({ name: 'content_post', type: 'varchar', nullable: false })
  contentPost: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_creator' })
  userCreator: UserEntity;

  @OneToMany(() => ComentEntity, (coment) => coment.post)
  coments: ComentEntity[];

  @OneToMany(() => PostTagEntity, (tag) => tag.post)
  tags: PostTagEntity[];

  @OneToMany(() => LikeEntity, (like) => like.post)
  @JoinColumn({ name: 'id' })
  likes: LikeEntity[];
}
