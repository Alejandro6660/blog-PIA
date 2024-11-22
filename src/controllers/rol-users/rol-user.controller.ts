import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WinstonLoggerAdapter } from 'src/adapters/winston.adapter';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { IRespuesta } from 'src/interfaces/General/IRespuesta.interface';
import { CatalogoRolUserModel } from 'src/models/rolUsers/Catalogo-RolUser.model';
import { CreateRolUserModel } from 'src/models/rolUsers/Create-RolUser.model';
import { RolUserModel } from 'src/models/rolUsers/RolUser.model';
import { UpdateRolUserModel } from 'src/models/rolUsers/Update-RolUser.model';
import { RolUserService } from 'src/services/rol-users/rol-user.service';

@Controller('rolUser')
export class RolUserController {
  constructor(
    private readonly rolUserService: RolUserService,
    private logger: WinstonLoggerAdapter,
  ) {}

  @Post()
  @Auth(ROLES.ADMIN)
  async createRolUser(
    @Body() value: CreateRolUserModel,
  ): Promise<RolUserModel> {
    const rolUser = await this.rolUserService.create(value);
    return rolUser;
  }

  @Get('/getById/:id')
  @Auth(ROLES.ADMIN)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<RolUserModel> {
    const rolUser = await this.rolUserService.getById(id);
    if (!rolUser) throw new InternalServerErrorException('Error');
    return rolUser;
  }

  @Get()
  @Auth(ROLES.ADMIN)
  async getAll(): Promise<RolUserModel[]> {
    const rols = await this.rolUserService.getAll();
    if (!rols || rols.length === 0) {
      throw new InternalServerErrorException('No exists.');
    }
    return rols; // Retorna el array de roles
  }

  @Put('/update/:id')
  @Auth(ROLES.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRolUserModel,
  ): Promise<RolUserModel> {
    const rolUser = this.rolUserService.update(id, body);
    return rolUser;
  }

  @Put()
  @Auth(ROLES.ADMIN)
  async delete(@Body() { Id }: { Id: string }): Promise<IRespuesta> {
    const id = parseInt(Id);
    const response = await this.rolUserService.delete(id);
    return response;
  }

  @Get('/catalogRolUser')
  @Auth(ROLES.ADMIN)
  async getCatalog(): Promise<CatalogoRolUserModel[]> {
    return this.rolUserService.getCatalog();
  }
}
