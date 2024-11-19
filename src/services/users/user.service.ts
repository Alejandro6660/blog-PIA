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
import { CatalogoRolUserModel } from 'src/models/rolUsers/Catalogo-RolUser.model';
import { LinkModel } from 'src/models/users/link.model';
import { GetUserAdmin } from 'src/models/users/Get-User.model';
import { link } from 'fs';
import { AuthUserModel } from 'src/models/users/Auth-User.model';
import { GetClientUserModel } from 'src/models/users/GetClient-User.model';

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

  async getAll(): Promise<UserModel[]> {
    const users = await this.userRepository.find({
      where: { isDelated: false },
      relations: ['userRole'],
      order: { id: 'ASC' }, // Cambia 'ASC' por 'DESC' si quieres orden descendente
    });
    if (!users || users.length <= 0) {
      throw new BadRequestException('Users not found');
    }
    return users.map(
      (user) =>
        new UserModel(
          user.id,
          user.name,
          user.userName,
          user.lastName,
          user.email,
          new CatalogoRolUserModel(user.userRole.id, user.userRole.name),
        ),
    );
  }

  async getById(id: number): Promise<UserModel> {
    const Id = BigInt(id);

    const user = await this.userRepository.findOne({
      where: {
        id: Id,
      },
      relations: ['userRole', 'posts', 'link', 'imgAvatar', 'imgHero'],
    });

    if (!user) throw new BadRequestException('User not found');

    const rol = new CatalogoRolUserModel(user.userRole.id, user.userRole.name);

    const postCount = user.posts.length;

    const links: LinkModel[] = [];

    for (var item of user.link) {
      const link = new LinkModel(item.id, item.title, item.href, item.icon);
      links.push(link);
    }

    const returnUser = new GetUserAdmin(
      user.id,
      user.name,
      user.userName,
      user.lastName,
      user.email,
      rol,
      postCount,
      links,
      user.imgHero !== null ? user.imgHero.formatedTitle : '',
      user.imgAvatar !== null ? user.imgAvatar.formatedTitle : '',
    );

    return returnUser;
  }

  async getByIdClient(id: number): Promise<UserModel> {
    const Id = BigInt(id);

    const user = await this.userRepository.findOne({
      where: {
        id: Id,
      },
      relations: ['userRole', 'posts', 'link', 'imgAvatar', 'imgHero'],
    });

    if (!user) throw new BadRequestException('User not found');

    const rol = new CatalogoRolUserModel(user.userRole.id, user.userRole.name);

    const postCount = user.posts.length;

    const links: LinkModel[] = [];

    for (var item of user.link) {
      const link = new LinkModel(item.id, item.title, item.href, item.icon);
      links.push(link);
    }

    const returnUser = new GetClientUserModel(
      user.id,
      user.name,
      user.userName,
      user.lastName,
      user.email,
      rol,
      postCount,
      links,
      user.imgHero !== null ? user.imgHero.formatedTitle : '',
      user.imgAvatar !== null ? user.imgAvatar.formatedTitle : '',
    );

    return returnUser;
  }

  async getByIdEntity(idUser: bigint): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: idUser,
      },
      relations: ['imgAvatar'],
    });
  }

  async delete(id: number): Promise<IRespuesta> {
    const response: IRespuesta = { ok: false, message: '' };

    const Id = await BigInt(id);

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: Id,
        },
      });
      if (user === null) throw new BadRequestException('rol no exist');

      await this.userRepository.save({
        ...user,
        isDelated: true,
      });

      response.ok = true;
      response.message = 'user is delated.';
    } catch (error: any) {
      throw new InternalServerErrorException(`${error}`);
    }

    return response;
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
      if (!this.isPasswordEqual(password, confirmPassword))
        throw new BadRequestException('La contrasenia no coincide');

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        userRole: await this.rolUserRepository.findOneBy({
          id: BigInt(userModel.userRol),
        }),
      });

      await this.userRepository.save(user);

      const rol = new CatalogoRolUserModel(
        user.userRole.id,
        user.userRole.name,
      );

      const returnUser = new UserModel(
        user.id,
        user.name,
        user.userName,
        user.lastName,
        user.email,
        rol,
      );

      return returnUser;
    } catch (error) {
      this.handleErrorDB(error);
    }
  }

  async login(loginUser: LoginUserModel) {
    const { email, password } = loginUser;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userRole', 'imgAvatar'],
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
        imgAvatar: {
          formatedTitle: true,
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

    const rol = new CatalogoRolUserModel(user.userRole.id, user.userRole.name);

    const userModel = new AuthUserModel(
      user.id,
      user.name,
      user.userName,
      user.lastName,
      user.email,
      rol,
      user.imgAvatar !== null ? user.imgAvatar.formatedTitle : '',
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
