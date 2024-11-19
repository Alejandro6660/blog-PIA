import { Module } from '@nestjs/common';
import { TagController } from 'src/controllers/tags/tag.controller';
import { TagService } from 'src/services/tags/tag.service';
import { UserModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/entities/tags/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService, UserModule],
  controllers: [TagController],
  exports: [TypeOrmModule, TagService],
})
export class TagModule {}
