import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/entities/tags/tag.entity';
import { CreateNewPostTagModule } from 'src/models/posts/Create-NewPost.model';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createOrGetTag(model: CreateNewPostTagModule[]): Promise<TagEntity[]> {
    const tags: TagEntity[] = [];
    for (const tag of model) {
      let tagExists = await this.tagRepository.findOne({
        where: { name: tag.name.toLowerCase() },
      });

      if (!tagExists) {
        tagExists = await this.tagRepository.save({
          name: tag.name.toLowerCase(),
        });
      }
      tags.push(tagExists);
    }
    return tags;
  }
}
