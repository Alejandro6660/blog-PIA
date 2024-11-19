import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateNewPostModel {
  @IsNotEmpty({ message: 'Title is null' })
  @IsString()
  @MinLength(1, { message: 'Title is too short' })
  titlePost: string;

  @IsNotEmpty({ message: 'Content is null' })
  @IsString()
  @MinLength(1, { message: 'Content is too short' })
  contentPost: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Ensure each item in the array is validated
  @Type(() => CreateNewPostTagModule) // Transform plain objects to class instances
  tags: CreateNewPostTagModule[];
}

export class CreateNewPostTagModule {
  @IsString()
  @IsNotEmpty()
  name: string;
}
