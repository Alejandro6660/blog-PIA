interface IRolUserModel {
  id: string;
  name: string;
  description: string;
  level: number;
  createdAT: Date;
}
/**
 * Representa un modelo de usuario con rol.
 */
export class RolUserModel {
  constructor(public readonly obj: IRolUserModel) {}

  /**
   * Crea una nueva instancia de RolUserModel.
   * @param data - { id: string, name: string, description: string, level: number, createdAT: Date }
   * @returns Un arreglo donde el primer elemento es un mensaje de error (si existe) y el segundo es la instancia de RolUserModel (si se crea exitosamente).
   */
  static create(data: IRolUserModel): [string?, RolUserModel?] {
    const { id, name, description, level, createdAT } = data;
    if (!id) return ['Missing Id', undefined];
    if (!name) return ['Missing Name', undefined];
    if (!description) return ['Missing Description', undefined];
    if (!level) return ['Missing Level', undefined];
    if (!createdAT) return ['Missing Date', undefined];

    return [
      undefined,
      new RolUserModel({ id, name, description, level, createdAT }),
    ];
  }
}
