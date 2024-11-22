import { BaseEntity } from '../../common/base.entity';
import { ITag } from 'src/interfaces/tags/tag.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostTagEntity } from './post.tag.entity';

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity implements ITag {
  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => PostTagEntity, (postHashtag) => postHashtag.tag)
  postHashtags: PostTagEntity[];
}
