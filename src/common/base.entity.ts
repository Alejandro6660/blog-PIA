import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'createdAT',
  })
  createdAT: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updateAT',
  })
  updateAT: Date;

  @Column({ type: 'boolean', default: false })
  isDelated: boolean;
}
