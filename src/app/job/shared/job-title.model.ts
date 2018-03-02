export class JobTitle {
  type_id: number;
  title: string;

  constructor(type_id: number, title: string) {
    this.type_id = type_id;
    this.title = title;
  }
}
