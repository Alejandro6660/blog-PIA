/**
 * Representa un modelo de usuario con rol.
 */
export class RolUserModel {
  constructor(id: bigint, name: string, level: number) {
    this.id = id;
    this.name = name;
    this.level = level;
  }

  id: bigint;
  name: string;
  level: number;
}
