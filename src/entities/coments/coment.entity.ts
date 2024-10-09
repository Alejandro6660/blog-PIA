import { BaseEntity } from 'src/common/base.entity';
import { IComent } from 'src/interfaces/coments/coment.interface';
import { PostEntity } from '../posts/post.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'coment' })
export class ComentEntity extends BaseEntity implements IComent {
  @ManyToOne(() => PostEntity, (post) => post.coments, {
    nullable: false,
  })
  @JoinColumn({ name: 'post' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.coments, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_creator' })
  userCreator: UserEntity;

  @Column({ name: 'content', length: 250, type: 'varchar', nullable: false })
  content: string;
}
