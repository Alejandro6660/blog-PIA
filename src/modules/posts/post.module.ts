import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/posts/post.entity';
import { PostService } from 'src/services/posts/post.service';
import { UserModule } from '../users/user.module';
import { PostController } from 'src/controllers/posts/post.controller';
import { TagModule } from '../tags/tag.module';
import { PostTagEntity } from 'src/entities/tags/post.tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostTagEntity]),
    UserModule,
    TagModule,
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [TypeOrmModule],
})
export class PostModule {}
