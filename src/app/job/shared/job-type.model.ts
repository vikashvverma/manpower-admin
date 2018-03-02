export class JobType {
  type_id: number;
  industry: string;

  constructor(type_id: number, industry: string) {
    this.type_id = type_id;
    this.industry = industry;
  }
}
