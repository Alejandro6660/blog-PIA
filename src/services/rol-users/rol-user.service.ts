import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { CreateRolUserModel } from 'src/models/rolUsers/Create-RolUser.model';
import { RolUserModel } from 'src/models/rolUsers/RolUser.model';
import { Repository } from 'typeorm';
import { UpdateRolUserModel } from 'src/models/rolUsers/Update-RolUser.model';
import { IGeneral } from '../../interfaces/General/IGeneral.interface';
import { IRespuesta } from 'src/interfaces/General/IRespuesta.interface';
import { CatalogoRolUserModel } from 'src/models/rolUsers/Catalogo-RolUser.model';

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
      const rol = await this.rolUserRepository.save({ ...body });
      return new RolUserModel(rol.id, rol.name, rol.level);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //#endregion

  //#region getById RolUser
  async getById(id: number): Promise<RolUserModel> {
    try {
      const Id = await BigInt(id);
      const rol = await this.rolUserRepository.findOneBy({ id: Id });
      if (!rol) throw new BadRequestException('rol not found');
      if (rol.isDelated)
        throw new ForbiddenException('rol are not exist talk a admin');
      return new RolUserModel(rol.id, rol.name, rol.level);
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  //#endregion

  //#region getAll RolUsers
  async getAll(): Promise<RolUserModel[]> {
    try {
      let rols: RolUserModel[] = [];
      // Array de instancias de RolUserModel
      const rolUsers = await this.rolUserRepository.find({
        where: {
          isDelated: false, // Corregido el typo
        },
      });

      if (!rolUsers || rolUsers.length === 0) {
        throw new BadRequestException(`error`);
      }

      for (const rolUser of rolUsers) {
        let rol = new RolUserModel(rolUser.id, rolUser.name, rolUser.level);
        if (!rol) throw new InternalServerErrorException('Error');
        rols.push(rol);
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
      return;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  //#endregion

  //#region delete RolUser
  async delete(id: number): Promise<IRespuesta> {
    const response: IRespuesta = { ok: false, message: '' };
    const Id = BigInt(id);
    try {
      const rol = await this.rolUserRepository.findOne({
        where: { id: Id },
      });
      if (rol === null) throw new BadRequestException('rol no exist');

      await this.rolUserRepository.save({
        ...rol,
        isDelated: true,
      });
      response.ok = true;
      response.message = 'Rol is delated.';
      return response;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async getCatalog(): Promise<CatalogoRolUserModel[]> {
    const roles = await this.rolUserRepository.find({
      where: { isDelated: false },
    });

    if (!roles || roles.length <= 0) {
      throw new BadRequestException('roles not found');
    }

    return roles.map((rol) => new CatalogoRolUserModel(rol.id, rol.name));
  }
  //#endregion
}
