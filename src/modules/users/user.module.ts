import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/users/user.controller';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { UserEntity } from 'src/entities/users/user.entity';
import { UserService } from 'src/services/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolUserEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
