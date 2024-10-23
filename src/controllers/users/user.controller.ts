import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserModel } from 'src/models/users/Register-User.model';
import { UserService } from 'src/services/users/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() userModel: RegisterUserModel) {
    return this.userService.register(userModel);
  }

  @Post()
  create(@Body() userModel: RegisterUserModel) {}
}
