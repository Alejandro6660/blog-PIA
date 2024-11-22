import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentController } from 'src/controllers/coments/coment.controller';
import { ComentEntity } from 'src/entities/coments/coment.entity';
import { ComentService } from 'src/services/coments/coment.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComentEntity]), UserModule],
  controllers: [ComentController],
  providers: [ComentService],
})
export class ComentModule {}
