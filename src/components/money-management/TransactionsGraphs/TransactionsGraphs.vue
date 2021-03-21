<!-- Template -->
<template>
  <div>
    <apexchart
      class="chart-container"
      width="90%"
      type="pie"
      :options="categoryPieChartOptions"
      :series="categoryPieChartSeries"
    ></apexchart>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { Transaction } from '@/db/models/transaction';
import { defineComponent, PropType, toRefs } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useCateogryPieChartData } from '@/composables/graphs/useCateogryPieChartData';

export default defineComponent({
  name: 'TransactionsGraphs',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    transactions: Array as PropType<Array<Transaction>>
  },
  setup(props) {
    const { transactions } = toRefs(props);
    const { categoryPieChartOptions, categoryPieChartSeries } = useCateogryPieChartData(transactions, 'categories-tooltip-container');

    return {
      props,
      categoryPieChartOptions,
      categoryPieChartSeries
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.chart-container {
  display: flex;
  justify-content: center;
}

:deep(.categories-tooltip-container) {
  padding: 10px;
  display: flex;
  align-items: center;

  i {
    font-size: 28px;
    margin-right: 5px;
  }
}
</style>
