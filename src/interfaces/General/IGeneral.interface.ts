export interface IGeneral<T, U, P> {
  create(obj: T): Promise<U>;

  update(id: bigint, obj: P): Promise<U>;

  getAll(): Promise<U[]>;

  getById(id: bigint): Promise<U>;

  delete(id: bigint): Promise<U>;
}
