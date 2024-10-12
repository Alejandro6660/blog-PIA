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
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { WinstonLoggerAdapter } from 'src/adapters/winston.adapter';
import { customError } from 'src/config/errors.config';
import { httpError } from 'src/enums/errors/httpError.enum';
import { LogSeverity } from 'src/enums/logs/log.enum';
import { LogModel } from 'src/models/logs/log.model';
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

  private handleError(error: unknown) {
    if (error instanceof customError) {
      let log: LogModel;
      switch (error.type) {
        case httpError.BAD_REQUEST:
          log = new LogModel(error.message, LogSeverity.HIGH);
          this.logger.high(log);
          throw new BadRequestException(error.message);
          break;
        case httpError.UNAUTHORIZED:
          log = new LogModel(error.message, LogSeverity.FATAL);
          this.logger.fatal(log);
          throw new UnauthorizedException(error.message);
          break;
        case httpError.FORBIDDEN:
          log = new LogModel(error.message, LogSeverity.HIGH);
          this.logger.high(log);
          throw new ForbiddenException(error.message);
          break;
        case httpError.NOT_FOUND:
          log = new LogModel(error.message, LogSeverity.MEDIUM);
          this.logger.medium(log);
          throw new NotFoundException(error.message);
          break;
        default:
          let meesage = `Unidentified Unexpected Error`;
          log = new LogModel(meesage, LogSeverity.MEDIUM);
          this.logger.medium(log);
          throw new InternalServerErrorException(meesage);
          break;
      }
    } else {
      const message = 'Unidentified Unexpected Error';
      const log = new LogModel(message, LogSeverity.FATAL);
      this.logger.fatal(log);
      throw new InternalServerErrorException(message);
    }
  }

  @Post()
  async createUser(@Body() value: CreateRolUserModel): Promise<RolUserModel> {
    try {
      const rolUser = await this.rolUserService.create(value);
      return rolUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<RolUserModel> {
    try {
      const rolUser = await this.rolUserService.getById(id);
      if (!rolUser) throw new InternalServerErrorException('Error');
      return rolUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get()
  async getAll(): Promise<RolUserModel[]> {
    try {
      const rols = await this.rolUserService.getAll();

      if (!rols || rols.length === 0) {
        throw new InternalServerErrorException('No exists.');
      }

      return rols; // Retorna el array de roles
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRolUserModel,
  ): Promise<RolUserModel> {
    try {
      const rolUser = this.rolUserService.update(id, body);
      return rolUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<RolUserModel> {
    try {
      const rolUser = this.rolUserService.delete(id);
      return rolUser;
    } catch (error) {
      this.handleError(error);
    }
  }
}
