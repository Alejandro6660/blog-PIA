import { Module } from '@nestjs/common';
import { DocumentController } from 'src/controllers/documents/document.controller';
import { DocumentService } from 'src/services/documents/document.service';

@Module({
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
