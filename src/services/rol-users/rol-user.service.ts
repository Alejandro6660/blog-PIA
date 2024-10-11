import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { CreateRolUserModel } from 'src/models/rolUsers/Create-RolUser.model';
import { RolUserModel } from 'src/models/rolUsers/RolUser.model';
import { Repository } from 'typeorm';
import { customError } from 'src/config/errors.config';
import { GeneralService } from '../General/general.service';

@Injectable()
export class RolUserService {
  constructor(
    @InjectRepository(RolUserEntity)
    private readonly rolUserRepository: Repository<RolUserEntity>,
    protected readonly General: GeneralService<RolUserEntity>,
  ) {}
  //? #region add RolUser
  async add(body: CreateRolUserModel): Promise<RolUserModel> {
    try {
      const rolUserCreated = await this.rolUserRepository.save(body);
      const [error, rolUserModel] = RolUserModel.create({ ...rolUserCreated });
      if (error) {
        throw customError.badRequest(error);
      } else {
        return rolUserModel;
      }
    } catch (error) {
      throw customError.internalServer(`${error}`);
    }
  }

  async getById(id: string): Promise<RolUserModel> {
    try {
      const roluser = await this.General.getById(this.rolUserRepository, id);
      if (!roluser) throw customError.notFound(`Rol not found by id ${id}`);
      const [error, rolUserModel] = await RolUserModel.create(roluser);
      if (error) throw customError.badRequest(error);
      return rolUserModel;
    } catch (error) {
      throw customError.internalServer(`${error}`);
    }
  }
  //#endregion
}
