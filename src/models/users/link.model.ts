import { iconType } from 'src/enums/user/icon.enum';

export class LinkModel {
  constructor(id: bigint, title: string, href: string, icon: iconType) {
    this.id = id;
    this.title = title;
    this.href = href;
    this.icon = icon;
  }

  public id: bigint;
  public title: string;
  public href: string;
  public icon: iconType;
}
