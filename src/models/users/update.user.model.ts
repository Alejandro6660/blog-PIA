import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DocumentEntity } from 'src/entities/documents/document.entity';
import { RolUserEntity } from 'src/entities/rolUsers/rol-user.entity';

export class UpdateUserModel {
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
  @MinLength(1, {
    message: 'lasname is to short',
  })
  @MaxLength(20, {
    message: 'lasname is too long',
  })
  lastName: string;

  @IsOptional()
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
  description: string;

  @IsOptional()
  userRole: RolUserEntity;
}
