import { IRespuesta } from './IRespuesta.interface';

export interface IGeneral<T, U, P> {
  create(obj: T): Promise<U>;

  update(id: number, obj: P): Promise<U>;

  getAll(): Promise<U[]>;

  getById(id: number): Promise<U>;

  delete(id: number): Promise<IRespuesta>;
}
