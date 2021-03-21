<!-- Template -->
<template>
  <div>
    <div class="aggregates-row">
      <TransactionsAggregateValue label="Monthly Budget" :value="monthlyBudget" :numberFormat="NumberFormat.None" />
      <div class="aggregate-separator"></div>
      <TransactionsAggregateValue label="Target Savings" :value="targetSavings" :numberFormat="NumberFormat.Percent" />
      <div class="aggregate-separator"></div>
      <TransactionsAggregateValue label="Available Budget" :value="incomeAfterSavingsTarget" :numberFormat="NumberFormat.None" />

      <div class="aggregate-separator first-aggregates-row-addition"></div>
      <TransactionsAggregateValue class="first-aggregates-row-addition" label="Expenses" :value="totalExpenses" />
      <div class="aggregate-separator first-aggregates-row-addition"></div>
      <TransactionsAggregateValue class="first-aggregates-row-addition" label="Remaining" :value="remainingBudget" :numberFormat="NumberFormat.None" />
    </div>

    <hr class="aggregates-row-separator second-aggregates-row-item" />

    <div class="aggregates-row second-aggregates-row-item">
      <TransactionsAggregateValue label="Expenses" :value="totalExpenses" />
      <div class="aggregate-separator"></div>
      <TransactionsAggregateValue label="Remaining" :value="remainingBudget" :numberFormat="NumberFormat.None" />
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { NumberFormat } from '@/common/enums/NumberFormat';
import useTransactionsSum from '@/composables/transactions/useTransactionsSum';
import { Settings } from '@/db/models/settings';
import { Transaction } from '@/db/models/transaction';
import { computed, defineComponent, PropType, toRefs } from 'vue';
import TransactionsAggregateValue from './TransactionsAggregateValue.vue';

export default defineComponent({
  name: 'TransactionsAggregates',
  components: {
    TransactionsAggregateValue
  },
  props: {
    transactions: Array as PropType<Array<Transaction>>,
    settings: Object as () => Settings
  },
  setup(props) {
    const { transactions, settings } = toRefs(props);
    const totalExpenses = useTransactionsSum(transactions);

    const monthlyBudget = computed(() => settings?.value?.monthlyBudget || 0)
    const targetSavings = computed(() => settings?.value?.targetSavings || 0)

    const incomeAfterSavingsTarget = computed(() => {
      const monthlyBudget = settings?.value?.monthlyBudget || 0;
      const targetSavings = settings?.value?.targetSavings || 0;
      const savingsAmount = monthlyBudget * targetSavings / 100;
      return monthlyBudget - savingsAmount;
    })

    const remainingBudget = computed(() => {
      return (incomeAfterSavingsTarget.value || 0) + (totalExpenses.value || 0);
    })

    // income, income after target savings, total expenses, remaining (colored)
    return {
      monthlyBudget,
      targetSavings,
      incomeAfterSavingsTarget,
      totalExpenses,
      remainingBudget,
      NumberFormat
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";
@import "../../../common/styles/constants.scss";

.aggregates-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.aggregate-separator {
  background-color: $primary;
  height: 20px;
  width: 1px !important;
  margin: 0px;
  border-radius: 10px;
  margin: 0 15px;
}

// two rows
.aggregates-row-separator {
  width: 75%;
  border: none;
  margin: 10px auto;
  height: 1px;
  background-color: $light;
}

.second-aggregates-row-item {
  visibility: visible;
}

.first-aggregates-row-addition {
  visibility: hidden;
  position: absolute;
}

// single row
@media only screen and (min-width: $singleRowAggregatesWindowWidth) {
  .second-aggregates-row-item {
    visibility: hidden;
    display: none;
  }

  .first-aggregates-row-addition {
    visibility: visible;
    position: initial;
  }

  .aggregates-row-separator {
    margin: 0 auto;
  }
}
</style>
