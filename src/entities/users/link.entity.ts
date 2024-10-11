import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { iconType } from '../../enums/user/icon.enum';

@Entity({ name: 'link' })
export class LinkEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'href', type: 'varchar' })
  href: string;

  @Column({ name: 'icon', type: 'enum', enum: iconType })
  icon: iconType;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
