import { BaseModel } from './baseModel';
import { Category } from './category';

export class Transaction extends BaseModel {
  public categoryId!: string;
  public amount!: number;
  public title!: string;
  public notes!: string;
  public date!: number;
  public category?: Category;
}
