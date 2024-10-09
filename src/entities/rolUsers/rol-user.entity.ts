import { BaseEntity } from 'src/common/base.entity';
import { IRolUser } from 'src/interfaces/rolUsers/rol-user.interface';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rol_user' })
export class RolUserEntity extends BaseEntity implements IRolUser {
  @Column({ name: 'name', type: 'varchar', length: 20 })
  name: string;
  @Column({ name: 'description', type: 'varchar', length: 254 })
  description: string;
  @Column({ name: 'level', type: 'int' })
  level: number;
}
