import { Category } from '../models/category';
import { DbRepository } from './dbRepository';

export class CategoriesRepository extends DbRepository<Category> {
  protected type = 'category';
}
