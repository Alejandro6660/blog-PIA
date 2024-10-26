import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/entities/users/user.entity';
import { AuthTokenResult, IUseToken } from 'src/interfaces/Auth/auth.interface';
import { IJwtStrategy } from 'src/interfaces/JwtStrategy/IJwtStrategy.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    config: ConfigService,
  ) {
    super({
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: AuthTokenResult): Promise<UserEntity> {
    const expiredDate = new Date();
    const currentDate: Date = new Date(payload.exp);

    const useToken: IUseToken = {
      sub: payload.sub,
      role: payload.role,
      isExpired: +expiredDate <= +currentDate / 1000,
    };

    if (useToken.isExpired)
      throw new UnauthorizedException('Your token is expired.');

    const Id = await BigInt(payload.sub);
    const user = await this.userRepository.findOne({
      where: { id: Id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        userName: true,
        password: false,
        validateEmail: true,
        description: false,
        userRole: {
          id: true,
          name: true,
        },
      },
      relations: ['userRole'], // Asegúrate de que este nombre coincida con la relación definida en UserEntity
    });
    if (!user) throw new UnauthorizedException('Token not valid');

    if (user.isDelated)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}
