import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LinkEntity } from './link.entity';
import { IUser } from '../../interfaces/users/user.interface';
import { BaseEntity } from '../../common/base.entity';
import { DocumentEntity } from '../documents/document.entity';
import { PostEntity } from '../posts/post.entity';
import { ComentEntity } from '../coments/coment.entity';
import { RolUserEntity } from '../rolUsers/rol-user.entity';
import { LikeEntity } from '../posts/like.user.post.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({ name: 'name', length: 40, type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'lastname', length: 40, type: 'varchar', nullable: false })
  lastName: string;

  @Column({ name: 'userName', unique: true, type: 'varchar', length: 20 })
  userName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'description', length: 500, type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  validateEmail: boolean;

  @ManyToOne(() => DocumentEntity, { nullable: true, cascade: true })
  @JoinColumn({ name: 'imgHeroId' })
  imgHero: DocumentEntity;

  @ManyToOne(() => DocumentEntity, { nullable: true, cascade: true })
  @JoinColumn({ name: 'imgAvatarId' })
  imgAvatar: DocumentEntity;

  @ManyToOne(() => RolUserEntity, { nullable: false })
  @JoinColumn({ name: 'RolId' })
  userRoles: RolUserEntity;

  @OneToMany(() => PostEntity, (post) => post.userCreator)
  posts: PostEntity[];

  @OneToMany(() => ComentEntity, (coment) => coment.userCreator)
  coments: ComentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => LinkEntity, (link) => link.user)
  link: LinkEntity[];
}
