import { Controller, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { ROLES } from 'src/enums/rolUser/role.interface';
import { ComentService } from 'src/services/coments/coment.service';

@Controller('coment')
export class ComentController {
  constructor(private readonly comentService: ComentService) {}

  @Post('/create')
  @Auth(ROLES.CLIENT)
  async create() {}
}
