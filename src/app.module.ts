import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './modules/documents/document.module';
import { PostModule } from './modules/posts/post.module';
import { UserModule } from './modules/users/user.module';
import { RolUserModule } from './modules/rol-users/rol-user.module';
import { TagModule } from './modules/tags/tag.module';
import { ComentModule } from './modules/coments/coment.module';
import { DocumentService } from './services/documents/document.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    DocumentModule,
    PostModule,
    UserModule,
    RolUserModule,
    TagModule,
    ComentModule,
    /*     TypeOrmModule.forRoot({ ...DataSourceConfig }), */
  ],
})
export class AppModule {}
