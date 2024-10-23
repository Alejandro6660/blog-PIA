import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { CreateRolUserModel } from 'src/models/rolUsers/Create-RolUser.model';
import { RolUserModel } from 'src/models/rolUsers/RolUser.model';
import { Repository } from 'typeorm';
import { GeneralService } from '../General/general.service';
import { UpdateRolUserModel } from 'src/models/rolUsers/Update-RolUser.model';
import { IGeneral } from '../../interfaces/General/IGeneral.interface';

@Injectable()
export class RolUserService
  implements IGeneral<CreateRolUserModel, RolUserModel, UpdateRolUserModel>
{
  constructor(
    @InjectRepository(RolUserEntity)
    private readonly rolUserRepository: Repository<RolUserEntity>,
  ) {}
  // #region add RolUser
  async create(body: CreateRolUserModel): Promise<RolUserModel> {
    try {
      const rolUserCreated = await this.rolUserRepository.create({ ...body });
      await this.rolUserRepository.save(rolUserCreated);
      const [error, rolUserModel] = RolUserModel.create({ ...rolUserCreated });
      if (error) {
        throw new BadRequestException(error);
      } else {
        return rolUserModel;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //#endregion

  //#region getById RolUser
  async getById(id: number): Promise<RolUserModel> {
    try {
      const roluser = await GeneralService.getById(
        this.rolUserRepository,
        BigInt(id),
      );
      if (!roluser) throw new BadRequestException(`error`);
      const [error, rolUserModel] = await RolUserModel.create(roluser);
      if (error) throw new BadRequestException(error);
      return rolUserModel;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  //#endregion

  //#region getAll RolUsers
  async getAll(): Promise<RolUserModel[]> {
    try {
      let rols: RolUserModel[] = []; // Array de instancias de RolUserModel
      const rolUsers = await this.rolUserRepository.find({
        where: {
          isDelated: false, // Corregido el typo
        },
      });

      if (!rolUsers || rolUsers.length === 0) {
        throw new BadRequestException(`error`);
      }

      for (const rolUser of rolUsers) {
        const [error, rolUserModel] = RolUserModel.create({ ...rolUser });

        if (error) throw new BadRequestException(error);
        rols.push(rolUserModel); /// Añadimos cada rol al array
      }

      return rols; // Retorna un array de instancias de RolUserModel
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  //#endregion

  //#region update RolUser
  async update(id: number, data: UpdateRolUserModel): Promise<RolUserModel> {
    try {
      const rolUser = await GeneralService.getById(
        this.rolUserRepository,
        BigInt(id),
      );
      if (!rolUser) throw new NotFoundException(`Rol not found by id ${id}`);
      const rol = await this.rolUserRepository.save({
        ...rolUser,
        ...data,
      });
      const [error, rolUserModel] = await RolUserModel.create({ ...rol });
      if (error) throw new BadRequestException(error);
      return rolUserModel;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  //#endregion

  async delete(id: number): Promise<RolUserModel> {
    try {
      await this.rolUserRepository.update(id, { isDelated: true });
      const obj = await GeneralService.getById(
        this.rolUserRepository,
        BigInt(id),
      );
      if (!obj) throw new BadRequestException(`Error`);
      const [error, rolUserModel] = await RolUserModel.create(obj);
      if (error) throw new BadRequestException(error);
      return rolUserModel;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
