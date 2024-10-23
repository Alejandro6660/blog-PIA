import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WinstonLoggerAdapter } from 'src/adapters/winston.adapter';
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
  async createUser(@Body() value: CreateRolUserModel): Promise<RolUserModel> {
    const rolUser = await this.rolUserService.create(value);
    return rolUser;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<RolUserModel> {
    const rolUser = await this.rolUserService.getById(id);
    if (!rolUser) throw new InternalServerErrorException('Error');
    return rolUser;
  }

  @Get()
  async getAll(): Promise<RolUserModel[]> {
    const rols = await this.rolUserService.getAll();
    if (!rols || rols.length === 0) {
      throw new InternalServerErrorException('No exists.');
    }
    return rols; // Retorna el array de roles
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRolUserModel,
  ): Promise<RolUserModel> {
    const rolUser = this.rolUserService.update(id, body);
    return rolUser;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<RolUserModel> {
    const rolUser = this.rolUserService.delete(id);
    return rolUser;
  }
}
