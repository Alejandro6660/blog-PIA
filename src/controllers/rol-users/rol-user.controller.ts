import { Body, Controller, Post } from '@nestjs/common';
import { customError } from 'src/config/errors.config';
import { CreateRolUserModel } from 'src/models/rolUsers/Create-RolUser.model';
import { RolUserModel } from 'src/models/rolUsers/RolUser.model';
import { RolUserService } from 'src/services/rol-users/rol-user.service';

@Controller('rolUser')
export class RolUserController {
  constructor(private readonly rolUserService: RolUserService) {}
  private handleError(error: unknown) {
    if (error instanceof customError) {
    }
  }

  @Post()
  async createUser(@Body() value: CreateRolUserModel): Promise<RolUserModel> {
    try {
      const rolUser = await this.rolUserService.add(value);
      return rolUser;
    } catch (error) {
      this.handleError(error);
    }
  }
}
