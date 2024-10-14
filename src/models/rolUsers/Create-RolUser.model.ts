import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRolUserModel {
  @IsNotEmpty({ message: 'Name is null' })
  @IsString()
  @MinLength(1, {
    message: 'Name is to short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message: 'Description is to short',
  })
  @MaxLength(254, {
    message: 'Description is too long',
  })
  description: string;

  @IsInt()
  @IsNotEmpty()
  level?: number;
}
