import { Expense } from '../models/expense';
import { DbRepository } from './dbRepository';

export class ExpensesRepository extends DbRepository<Expense> {
  protected type = 'expense';
}
