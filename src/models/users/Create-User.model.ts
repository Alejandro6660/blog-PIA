import { IsInt, IsNotEmpty } from 'class-validator';
import { RegisterUserModel } from './Register-User.model';
import { Transform } from 'class-transformer';

export class CreateUserModel extends RegisterUserModel {
  @IsNotEmpty({ message: 'Rol User is null' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  userRol: bigint;
}
