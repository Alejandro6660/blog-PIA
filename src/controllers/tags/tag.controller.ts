import { Controller, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { TagService } from 'src/services/tags/tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/create')
  @Auth(ROLES.ADMIN)
  async create() {}
}
