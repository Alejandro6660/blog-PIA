import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
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
import { CreateUserModel } from 'src/models/users/Create-User.model';
import { LoginUserModel } from 'src/models/users/Login-User.model';
import { IJwtStrategy } from 'src/interfaces/JwtStrategy/IJwtStrategy.interface';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RolUserEntity)
    private readonly rolUserRepository: Repository<RolUserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userModel: RegisterUserModel) {
    const { password, confirmPassword, ...userData } = userModel;
    try {
      if (this.isPasswordEqual(password, confirmPassword)) {
        const user = this.userRepository.create({
          ...userData,
          password: bcrypt.hashSync(password, 10),
          userRole: await this.rolUserRepository.findOneBy({ id: BigInt(1) }),
        });
        await this.userRepository.save(user);

        const returnUser = new UserModel(
          user.id,
          user.name,
          user.userName,
          user.lastName,
          user.email,
          user.userRole.name,
        );

        return {
          returnUser,
          token: this.getJwtToken({
            id: user.id.toString(),
            userName: user.userName,
          }),
        };
      } else {
        throw new BadRequestException('La contrasenia no coincide');
      }
    } catch (error) {
      console.log(error);
      this.handleErrorDB(error);
    }
  }

  async create(userModel: CreateUserModel) {
    const { password, confirmPassword, userRol, ...userData } = userModel;
    try {
      if (this.isPasswordEqual(password, confirmPassword)) {
        const user = this.userRepository.create({
          ...userData,
          password: bcrypt.hashSync(password, 10),
          userRole: await this.rolUserRepository.findOneBy({
            id: BigInt(userRol),
          }),
        });
        await this.userRepository.save(user);

        const returnUser = new UserModel(
          user.id,
          user.name,
          user.userName,
          user.lastName,
          user.email,
          user.userRole.name,
        );

        return {
          returnUser,
        };
      } else {
        throw new BadRequestException('La contrasenia no coincide');
      }
    } catch (error) {
      this.handleErrorDB(error);
    }
  }

  async login(userModel: LoginUserModel) {
    const { password, email } = userModel;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user)
      throw new UnauthorizedException('Credentials are not valids [email]');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valids [password]');
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id.toString(),
        userName: user.userName,
      }),
    };
  }

  private getJwtToken(payload: IJwtStrategy) {
    const token = this.jwtService.sign(payload);
    return token;
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
