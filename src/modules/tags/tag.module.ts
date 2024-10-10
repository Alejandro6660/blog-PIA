import { Module } from '@nestjs/common';
import { TagController } from 'src/controllers/tags/tag.controller';
import { TagService } from 'src/services/tags/tag.service';

@Module({
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
