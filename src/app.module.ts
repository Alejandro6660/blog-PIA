import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './modules/documents/document.module';
import { PostModule } from './modules/posts/post.module';
import { UserModule } from './modules/users/user.module';
import { RolUserModule } from './modules/rol-users/rol-user.module';
import { TagModule } from './modules/tags/tag.module';
import { ComentModule } from './modules/coments/coment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    DocumentModule,
    PostModule,
    UserModule,
    RolUserModule,
    TagModule,
    ComentModule,
    CommonModule,
  ],
})
export class AppModule {}
