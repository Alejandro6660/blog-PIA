import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolUserController } from 'src/controllers/rol-users/rol-user.controller';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { RolUserService } from 'src/services/rol-users/rol-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolUserEntity])],
  providers: [RolUserService],
  controllers: [RolUserController],
})
export class RolUserModule {}
