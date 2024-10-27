import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { GetUser } from 'src/decorators/auth/get-user.decorator';
import { UserEntity } from 'src/entities/users/user.entity';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { IGeneral } from 'src/interfaces/General/IGeneral.interface';
import { CreateUserModel } from 'src/models/users/Create-User.model';
import { LoginUserModel } from 'src/models/users/Login-User.model';
import { RegisterUserModel } from 'src/models/users/Register-User.model';
import { UserService } from 'src/services/users/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() userModel: RegisterUserModel) {
    return await this.userService.register(userModel);
  }

  @Post('/create')
  @Auth(ROLES.ADMIN)
  async createUser(@Body() userModel: CreateUserModel) {
    return await this.userService.create(userModel);
  }

  @Post('/login')
  async loginUser(@Body() userModel: LoginUserModel) {
    return await this.userService.login(userModel);
  }

  @Get('/test')
  @Auth(ROLES.ADMIN)
  async test(@GetUser() user: UserEntity) {
    return await { ok: true, message: 'Testing jwt', user: user };
  }

  @Get('/test2')
  @Auth()
  async test2(@GetUser() user: UserEntity) {
    return await { ok: true, message: 'Testing jwt', user: user };
  }

  @Get(':id')
  @Auth()
  async getUserById(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log('entro');
    return this.userService.getById(id);
  }
}
