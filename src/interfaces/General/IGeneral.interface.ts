export interface IGeneral<T, U, P> {
  create(obj: T): Promise<U>;

  update(id: string, obj: P): Promise<U>;

  getAll(): Promise<U[]>;

  getById(id: string): Promise<U>;

  delete(id: string): Promise<U>;
}
