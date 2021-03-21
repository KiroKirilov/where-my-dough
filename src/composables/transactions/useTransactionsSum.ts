import { Transaction } from '@/db/models/transaction';
import { computed, Ref } from 'vue';

export default function useTransactionsSum(transactions?: Ref<Transaction[] | undefined> | undefined) {
  return computed(() => {
    return (transactions?.value || []).reduce((prev, curr) => prev + (curr?.amount || 0), 0)
  });
}
