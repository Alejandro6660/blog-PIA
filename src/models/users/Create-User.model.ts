import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserModel {
  @IsNotEmpty({ message: 'Name is null' })
  @IsString()
  @MinLength(1, {
    message: 'Name is to short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @IsNotEmpty({ message: 'lasname is null' })
  @IsString()
  @MinLength(1, {
    message: 'lasname is to short',
  })
  @MaxLength(20, {
    message: 'lasname is too long',
  })
  lastName: string;

  @IsNotEmpty({ message: 'userName is null' })
  @IsString()
  @MinLength(1, {
    message: 'userName is to short',
  })
  @MaxLength(20, {
    message: 'userName is too long',
  })
  userName: string;

  @IsOptional()
  @IsString()
  @MaxLength(250, {
    message: 'description is too long',
  })
  description: string;

  @IsNotEmpty({ message: 'email is null' })
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is null' })
  @IsString()
  @MinLength(1, {
    message: 'password is to short',
  })
  @MaxLength(20, {
    message: 'password is too long',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsNotEmpty({ message: 'ConfirmPassword is null' })
  @IsString()
  @MinLength(1, {
    message: 'ConfirmPassword is to short',
  })
  @MaxLength(20, {
    message: 'ConfirmPassword is too long',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Rol User is null' })
  @Transform(({ value }) => BigInt(value))
  userRol: string;
}
