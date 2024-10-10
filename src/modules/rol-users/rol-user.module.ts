import { Module } from '@nestjs/common';
import { RolUserController } from 'src/controllers/rol-users/rol-user.controller';
import { RolUserService } from 'src/services/rol-users/rol-user.service';

@Module({
  providers: [RolUserService],
  controllers: [RolUserController],
})
export class RolUserModule {}
