import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { GetUser } from 'src/decorators/auth/get-user.decorator';
import { UserEntity } from 'src/entities/users/user.entity';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { CreateNewPostModel } from 'src/models/posts/Create-NewPost.model';
import { PostService } from 'src/services/posts/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postServicce: PostService) {}

  // @Post('/create')
  // @Auth(ROLES.CLIENT)
  // async createNewPost(
  //   @GetUser() user: UserEntity,
  //   @Body() createPostModel: CreateNewPostModel,
  // ) {
  //   return await this.postServicce.create(createPostModel, user.id);
  // }

  @Get('/getAll')
  async getAllPost() {
    return await this.postServicce.getAllPost();
  }

  @Get('/getAllByUser/:id')
  async getAllPostByUser(@Param('id', ParseIntPipe) id: number) {
    return await this.postServicce.getAllByIdUser(id);
  }

  @Get('/getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.postServicce.getById(id);
  }
}
