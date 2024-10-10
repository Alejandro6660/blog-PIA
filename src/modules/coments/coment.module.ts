import { Module } from '@nestjs/common';
import { ComentController } from 'src/controllers/coments/coment.controller';
import { ComentService } from 'src/services/coments/coment.service';

@Module({
  controllers: [ComentController],
  providers: [ComentService],
})
export class ComentModule {}
