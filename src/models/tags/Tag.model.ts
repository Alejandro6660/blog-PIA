export class TagModel {
  constructor(id: bigint, name: string) {
    this.id = id;
    this.name = name;
  }
  public id: bigint;
  public name: string;
}
