import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRolUserModel {
  @IsNotEmpty({ message: 'Name is null' })
  @MinLength(1, {
    message: 'Name is to short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(10, {
    message: 'Description is to short',
  })
  @MaxLength(254, {
    message: 'Description is too long',
  })
  description: string;

  @IsInt()
  level?: number;
}
