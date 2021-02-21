import { BaseModel } from './baseModel';

export class Settings extends BaseModel {
  monthlyBudget!: number;
  targetSavings!: number;
}
