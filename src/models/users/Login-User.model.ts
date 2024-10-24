import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserModel {
  @IsNotEmpty({ message: 'Email is null' })
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Password is null' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
