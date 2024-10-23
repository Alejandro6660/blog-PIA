import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { UserEntity } from 'src/entities/users/user.entity';
import { RegisterUserModel } from 'src/models/users/Register-User.model';
import { Repository } from 'typeorm';
import { GeneralService } from '../General/general.service';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/users/User.model';
import { RolUserModel } from 'src/models/rolUsers/RolUser.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RolUserEntity)
    private readonly rolUserRepository: Repository<RolUserEntity>,
  ) {}

  async register(userModel: RegisterUserModel) {
    const { password, confirmPassword, ...userData } = userModel;
    try {
      if (this.isPasswordEqual(password, confirmPassword)) {
        const user = this.userRepository.create({
          ...userData,
          password: bcrypt.hashSync(password, 10),
          userRoles: await this.rolUserRepository.findOneBy({ id: BigInt(1) }),
        });
        await this.userRepository.save(user);

        const returnUser = new UserModel(
          user.name,
          user.userName,
          user.lastName,
          user.email,
          user.userRoles.name,
        );

        return returnUser;
      } else {
        throw new BadRequestException('La contrasenia no coincide');
      }
    } catch (error) {
      console.log(error);
      this.handleErrorDB(error);
    }
  }

  private handleErrorDB(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(error.detail);
  }

  private isPasswordEqual(password: string, confirmPassword: string): boolean {
    const pass = password.trim();
    const cpass = confirmPassword.trim();
    let isTrue = false;
    if (pass === cpass) {
      isTrue = true;
    }
    return isTrue;
  }
}
