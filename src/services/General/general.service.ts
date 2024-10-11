import { Injectable } from '@nestjs/common';
import { customError } from 'src/config/errors.config';
import { FindOptionsWhere, Repository } from 'typeorm';

interface Identifiable {
  id: string;
}

/**
 * This class is a services General
 */
export class GeneralService {
  // Definir el generic directamente en la función estática
  static async getById<T extends Identifiable>(
    repository: Repository<T>,
    id: string,
  ): Promise<T | null> {
    try {
      const obj = await repository.findOne({
        where: { id } as FindOptionsWhere<T>,
      });
      return obj;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  }
}
