import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonLoggerAdapter } from 'src/adapters/winston.adapter';
import { RolUserController } from 'src/controllers/rol-users/rol-user.controller';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { GeneralService } from 'src/services/General/general.service';
import { RolUserService } from 'src/services/rol-users/rol-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolUserEntity])],
  providers: [
    RolUserService,
    WinstonLoggerAdapter,
    GeneralService<RolUserEntity>,
  ],
  controllers: [RolUserController],
})
export class RolUserModule {}
