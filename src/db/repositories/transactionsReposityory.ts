import { getMonthMaxAndMin } from '@/common/helpers/dates';
import { Transaction } from '../models/transaction';
import { RepositoryFactory } from '../repositoryFactory';
import { CategoriesRepository } from './categoriesRepository';
import { DbRepository } from './dbRepository';

const categoriesRepo = RepositoryFactory.createInstance(CategoriesRepository);

export class TransactionsRepository extends DbRepository<Transaction> {
  protected type = 'transaction';

  protected ensureIndex() {
    return this.db.createIndex({
      index: { fields: ['date', 'type'] }
    });
  }

  public async getByMonth(month: number, year: number): Promise<Transaction[]> {
    const { maxValue, minValue } = getMonthMaxAndMin(month, year);

    await this.ensureIndex();

    const transactionsPromise = this.db.find({
      selector: {
        date: {
          $gte: minValue,
          $lte: maxValue
        },
        type: this.type
      },
      sort: [{
        date: 'desc'
      }]
    });
    const categoriesPromise = categoriesRepo.getAll();

    const [transactionsData, categories] = await Promise.all([transactionsPromise, categoriesPromise]);

    const transactions = (transactionsData.docs as unknown) as Transaction[];

    for (const transaction of transactions) {
      transaction.category = categories.find(x => x._id === transaction.categoryId);
    }

    return transactions;
  }
}
