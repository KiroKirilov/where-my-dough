import { MonthObj } from '@/common/helpers/dates';
import { TransactionsRepository } from '@/db/repositories/transactionsReposityory';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { Ref, watch } from 'vue';
import { useData } from '../useData';

const transactionsRepo = RepositoryFactory.createInstance(TransactionsRepository);

export default function useTransactionsByMonth(monthObj: Ref<MonthObj>) {
  const { data, loading, getData, error } = useData(() => transactionsRepo.getByMonth(monthObj.value.month, monthObj.value.year));

  watch(monthObj, getData, { deep: true });

  return {
    transactionsRepo,
    transactionsByMonthError: error,
    transactionsByMonth: data,
    loading,
    getTransactionsForSelectedMonth: getData
  }
}
