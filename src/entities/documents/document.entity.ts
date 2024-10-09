import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { Typedocument } from 'src/enums/document/type.document.enum';
import { DocumentExtension } from 'src/enums/document/extnesion.document.enum';
import { BaseEntity } from 'src/common/base.entity';
import { IDocument } from 'src/interfaces/documents/document.interface';

@Entity({ name: 'document' })
export class DocumentEntity extends BaseEntity implements IDocument {
  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'formated_title', type: 'varchar' })
  formatedTitle: string;

  @Column({ type: 'enum', enum: DocumentExtension, name: 'file_extencion' })
  fileExtension: DocumentExtension;

  @Column({ name: 'formated_titlePDF', type: 'varchar' })
  fomatedTitlePDF: string;

  @Column({ type: 'enum', enum: Typedocument, name: 'document_type' })
  DocType: Typedocument;

  @Column({ type: 'varchar', name: 'file_size' })
  fileSize: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userCreatorId' })
  userCreator: UserEntity;
}
