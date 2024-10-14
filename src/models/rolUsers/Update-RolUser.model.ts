import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateRolUserModel {
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Name is to short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(10, {
    message: 'Description is to short',
  })
  @MaxLength(254, {
    message: 'Description is too long',
  })
  description: string;

  @IsOptional()
  @IsInt()
  level?: number;
}
