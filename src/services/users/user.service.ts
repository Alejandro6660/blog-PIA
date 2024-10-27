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
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/users/User.model';
import { CreateUserModel } from 'src/models/users/Create-User.model';
import { LoginUserModel } from 'src/models/users/Login-User.model';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { AuthResponse, PayloadToken } from 'src/interfaces/Auth/auth.interface';
import { IGeneral } from 'src/interfaces/General/IGeneral.interface';
import { UpdateUserModel } from 'src/models/users/update.user.model';
import { IRespuesta } from 'src/interfaces/General/IRespuesta.interface';

@Injectable()
export class UserService
  implements IGeneral<CreateUserModel, UserModel, UpdateUserModel>
{
  //#region Constructor
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RolUserEntity)
    private readonly rolUserRepository: Repository<RolUserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  //#endregion

  update(id: number, obj: UpdateUserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<UserModel[]> {
    throw new Error('Method not implemented.');
  }
  async getById(id: number): Promise<UserModel> {
    const Id = await BigInt(id);
    const user = await this.userRepository.findOne({
      where: { id: Id },
      relations: ['userRole'],
    });
    if (!user) throw new BadRequestException('User not found');

    const returnUser = await new UserModel(
      user.id,
      user.name,
      user.userName,
      user.lastName,
      user.email,
      user.userRole.name,
    );

    return returnUser;
  }
  delete(id: number): Promise<IRespuesta> {
    throw new Error('Method not implemented.');
  }

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

        return this.generateJWT(user);
      } else {
        throw new BadRequestException('La contrasenia no coincide');
      }
    } catch (error) {
      console.log(error);
      this.handleErrorDB(error);
    }
  }

  async create(userModel: CreateUserModel): Promise<UserModel> {
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

        return returnUser;
      } else {
        throw new BadRequestException('La contrasenia no coincide');
      }
    } catch (error) {
      this.handleErrorDB(error);
    }
  }

  async login(loginUser: LoginUserModel) {
    const { email, password } = loginUser;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userRole'],
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        password: true,
        userName: true,
        userRole: {
          id: true,
          name: true,
          level: true,
        },
      },
    });
    if (!user)
      throw new UnauthorizedException('Credentials are not valids [email]');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        'Incorrect email or password. Please check your details and try again.',
      );

    return this.generateJWT(user);
  }

  //?Private functions
  private async generateJWT(user: UserEntity): Promise<AuthResponse> {
    const payload: PayloadToken = {
      sub: user.id.toString(),
      role: user.userRole.name,
    };

    const userModel = await new UserModel(
      user.id,
      user.name,
      user.userName,
      user.lastName,
      user.email,
      user.userRole.name,
    );

    return {
      accessToken: this.signJWT({
        payload,
      }),
      user: userModel,
    };
  }

  private signJWT({ payload }: { payload: jwt.JwtPayload }): string {
    return this.jwtService.sign(payload);
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

  private handleErrorDB(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(error.detail);
  }
}
