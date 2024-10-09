import { Injectable } from '@nestjs/common';
import { LogModel } from 'src/models/logs/log.model';

@Injectable()
export class LogDocumentService {
  saveLog(log: LogModel): Promise<void> {
    throw new Error('Method no implemented');
  }
}
