import { Injectable } from '@nestjs/common';
import { customError } from 'src/config/errors.config';
import { FindOptionsWhere, Repository } from 'typeorm';
interface Identifiable {
  id: string;
}
@Injectable()
export class GeneralService<T extends Identifiable> {
  async getById(repository: Repository<T>, id: string): Promise<T | null> {
    try {
      const obj = await repository.findOne({
        where: { id } as FindOptionsWhere<T>,
      });
      return obj;
    } catch (error) {
      throw customError.internalServer(`${error}`);
    }
  }
}
