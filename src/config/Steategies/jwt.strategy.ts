import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';
import { UserEntity } from 'src/entities/users/user.entity';
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
  async validate(payload: IJwtStrategy): Promise<UserEntity> {
    const { id, userName } = payload;

    const Id = await BigInt(id);
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
