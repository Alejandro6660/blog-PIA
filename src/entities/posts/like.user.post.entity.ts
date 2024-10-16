import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'like' })
export class LikeEntity {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
