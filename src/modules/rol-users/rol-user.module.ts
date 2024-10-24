import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonLoggerAdapter } from 'src/adapters/winston.adapter';
import { RolUserController } from 'src/controllers/rol-users/rol-user.controller';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { RolUserService } from 'src/services/rol-users/rol-user.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolUserEntity]), UserModule],
  providers: [RolUserService, WinstonLoggerAdapter],
  controllers: [RolUserController],
})
export class RolUserModule {}
