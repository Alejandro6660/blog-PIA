import { UserEntity } from 'src/entities/users/user.entity';
import { DocumentExtension } from 'src/enums/document/extnesion.document.enum';
import { Typedocument } from 'src/enums/document/type.document.enum';

export interface IDocument {
  title: string;
  description: string;
  formatedTitle: string;
  fileExtension: DocumentExtension;
  fomatedTitlePDF: string;
  DocType: Typedocument;
  fileSize: number;
  userCreator: UserEntity;
}
