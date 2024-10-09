import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './services/documents/document.service';
import { DocumentModule } from './modules/documents/document.module';
import { DocumentController } from './controllers/documents/document.controller';
import { LogDocumentService } from './services/documents/log-document.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    DocumentModule,
    /*     TypeOrmModule.forRoot({ ...DataSourceConfig }), */
  ],
  providers: [DocumentService, LogDocumentService],
  controllers: [DocumentController],
})
export class AppModule {}
