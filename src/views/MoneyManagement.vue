<template>
  <PageWithHeader headerTitle="Money Management" headerIconName="money">
    <template v-slot:header>
      <IconButton
        v-on:click="openDialog(TransactionType.Income)"
        iconName="trending-up"
        text="New Income"
        buttonType="success"
        class="income-button"
        iconClass="money-management-icon"
      />

      <IconButton
        v-on:click="openDialog(TransactionType.Expense)"
        iconName="trending-down"
        text="New Expense"
        buttonType="danger"
        iconClass="money-management-icon"
      />
    </template>

    <template v-slot:content>
      <div class="row month-picker-container">
        <div class="col-8">
            <MonthPicker
              class="single-line-month-picker"
              :months="shortMonths"
              @change-year="yearChange"
              @input="monthChange"
              :default-month="defaultMonth"
              :default-year="monthObj.year"
            />
        </div>
      </div>

      <hr class="month-picker-content-separator" />

      <div class="row money-management-container">
        <div class="col-6 money-management-col">
          <div class="aggregates-and-picker-container">

            <div v-if="!hasError">
              <div class="aggregates-container">
                <TransactionsAggregates
                  :transactions="transactionsByMonth"
                  :settings="settingsForMonth"
                />
              </div>
            </div>
          </div>

          <div class="list-container" v-if="!hasError">
            <TransactionsList
              :transactions="transactionsByMonth"
              :loading="loading"
              @edit="editClicked"
              @delete="deleteClicked"
            />
          </div>

          <div v-if="hasError" class="transactions-error">
            <ErrorMessage
              message="An error ocurred while fetching your transactions :/"
              :onRetry="getTransactionsForSelectedMonth"
              :retrying="loading"
            />
          </div>
        </div>

        <div class="col-6 money-management-col">
          <TransactionsGraphs :transactions="transactionsByMonth" />
        </div>
      </div>

      <TransactionsForm
        @save="saveTransaction"
        @close="closeDialog"
        :showForm="dialogVisible"
        :transactionType="transactionType"
        :model="model"
      />
    </template>
  </PageWithHeader>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import PageWithHeader from '@/components/layout/PageWithHeader.vue';
import IconButton from '@/components/misc/IconButton.vue';
import ErrorMessage from '@/components/misc/ErrorMessage.vue';
import TransactionsList from '@/components/money-management/TransactionsList/TransactionsList.vue';
import TransactionsForm from '@/components/money-management/TransactionsForm/TransactionsForm.vue';
import TransactionsAggregates from '@/components/money-management/TransactionsAggregates/TransactionsAggregates.vue';
import { TransactionType } from '@/common/enums/TransactionType';
import { Transaction } from '@/db/models/transaction';
import useTransactionsByMonth from '@/composables/transactions/useTransactionsByMonth';
import { MonthPicker } from 'vue-month-picker';
import useDebouncedRef from '@/composables/useDebouncedRef';
import { MonthObj } from '@/common/helpers/dates';
import useSettingsForMonth from '@/composables/settings/useSettingsForMonth';
import TransactionsGraphs from '@/components/money-management/TransactionsGraphs/TransactionsGraphs.vue';

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default defineComponent({
  name: 'MoneyManagement',
  components: {
    PageWithHeader,
    IconButton,
    TransactionsList,
    TransactionsForm,
    MonthPicker,
    ErrorMessage,
    TransactionsAggregates,
    TransactionsGraphs
  },
  setup() {
    const dialogVisible = ref(false);
    const transactionType = ref<TransactionType>();
    const defaultMonth = new Date().getMonth() + 1;
    const monthObj = useDebouncedRef<MonthObj>(
      {
        month: defaultMonth,
        year: new Date().getFullYear()
      },
      500
    );
    const {
      transactionsRepo,
      getTransactionsForSelectedMonth,
      transactionsByMonth,
      transactionsByMonthError,
      loading
    } = useTransactionsByMonth(monthObj);

    const { settingsForMonth, settingsForMonthError } = useSettingsForMonth(
      monthObj
    );
    const model = ref<Transaction>();

    onMounted(getTransactionsForSelectedMonth);

    const openDialog = (
      formType: TransactionType,
      transaction: Transaction | undefined = undefined
    ) => {
      model.value = transaction;
      transactionType.value = formType;
      dialogVisible.value = true;
    };

    const closeDialog = () => {
      dialogVisible.value = false;
    };

    const saveTransaction = async (transaction: Transaction) => {
      if (transaction._id) {
        await transactionsRepo.update(transaction);
      } else {
        await transactionsRepo.create(transaction);
      }

      closeDialog();
      getTransactionsForSelectedMonth();
    };

    const monthChange = (event: any) => {
      monthObj.value = {
        year: event.year,
        month: event.monthIndex
      };
    };

    const yearChange = (newYear: number) => {
      const month = monthObj.value.month;

      monthObj.value = {
        year: newYear,
        month
      };
    };

    const editClicked = (transaction: Transaction) => {
      const transactionType =
        (transaction?.amount || 0) > 0
          ? TransactionType.Income
          : TransactionType.Expense;
      openDialog(transactionType, transaction);
    };

    const deleteClicked = async (transaction: Transaction) => {
      if (transaction?._id) {
        await transactionsRepo.delete(transaction);
        getTransactionsForSelectedMonth();
      }
    };

    watch(
      monthObj,
      () => {
        getTransactionsForSelectedMonth();
      },
      { deep: true }
    );

    return {
      dialogVisible,
      closeDialog,
      openDialog,
      TransactionType,
      transactionType,
      saveTransaction,
      shortMonths,
      yearChange,
      monthChange,
      monthObj,
      defaultMonth,
      transactionsByMonth,
      getTransactionsForSelectedMonth,
      loading,
      settingsForMonth,
      hasError: transactionsByMonthError.value && settingsForMonthError.value,
      deleteClicked,
      editClicked,
      model
    };
  }
});
</script>

<style scoped lang="scss">
@import "../common/styles/constants.scss";
$listContainerHeightOffset: 15px;
$aggregatesAndPickerContainerTwoRowHeight: 103px;
$aggregatesAndPickerContainerOneRowHeight: 45px;
$monthPickerHeight: 62px;

:deep(.money-management-icon) {
  margin-right: 6px;
}

.income-button {
  margin-right: 10px;
}

.money-management-container {
  padding: 5px 0;
  margin: 0 !important;
  height: 100%;

  .money-management-col {
    padding: 0 5px !important;
    height: 100%;
  }
}

.transactions-error {
  margin-top: 10px;
}

.aggregates-container {
  margin: 0;
}

.h-100 {
  height: 100%;
}

.list-container {
  height: calc(
    100vh - #{$aggregatesAndPickerContainerTwoRowHeight} - #{$titleBarHeight} - #{$pageHeaderHeight} - #{$listContainerHeightOffset} - #{$monthPickerHeight}
  );
}

.month-picker-container {
  display: flex;
  justify-content: center;
}

.aggregates-and-picker-container {
  height: $aggregatesAndPickerContainerTwoRowHeight;
}

.month-picker-content-separator {
  margin: 0 auto;
  margin-top: 5px;
  width: 99%;
}

@media only screen and (min-width: $singleRowAggregatesWindowWidth) {
  .aggregates-and-picker-container {
    height: $aggregatesAndPickerContainerOneRowHeight;
  }
  .list-container {
    height: calc(100vh - #{$aggregatesAndPickerContainerOneRowHeight} - #{$titleBarHeight} - #{$pageHeaderHeight} - #{$listContainerHeightOffset} - #{$monthPickerHeight});
  }
}
</style>
