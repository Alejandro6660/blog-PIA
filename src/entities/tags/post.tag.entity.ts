import { BaseEntity } from '../../common/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TagEntity } from './tag.entity';
import { PostEntity } from '../posts/post.entity';

@Entity({ name: 'post_hashtag' })
export class PostTagEntity extends BaseEntity {
  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(
    () => {
      return TagEntity;
    },
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'tag_id' })
  tags: TagEntity;
}
