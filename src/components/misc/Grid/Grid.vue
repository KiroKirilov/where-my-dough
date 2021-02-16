<!-- Template -->
<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="col in props.columns" v-bind:key="col" v-bind:class="{'sortable-header': col.sortable}" v-on:click="sortBy(col)" scope="col">
          <div v-if="$slots[`header-${col.name}`]">
            <slot :name="`header-${col.name}`"></slot>
          </div>

          <template v-if="!$slots[`header-${col.name}`]">
            {{ col.title || col.name }}
            <SortArrow :column="col" :sortInfo="sortInfo" />
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dataItem in sortedData" :key="dataItem">
        <td v-for="col in props.columns" v-bind:key="col" scope="col">
          <div v-if="$slots[`cell-${col.name}`]">
            <slot :name="`cell-${col.name}`" :dataItem="dataItem"></slot>
          </div>

          <template v-if="!$slots[`cell-${col.name}`]">
            {{ getFieldValue(dataItem, col) }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import { ColumnInfo } from './ColumnInfo';
import formatDateFilter from '@/filters/formatDateFilter';
import { ColumnType } from './ColumnType';
import useSortedData from '@/composables/grid/useSortedData';
import SortArrow from './SortArrow.vue';

export default defineComponent({
  name: 'Grid',
  components: {
    SortArrow
  },
  props: {
    data: Array as PropType<Array<any>>,
    columns: Array as PropType<Array<ColumnInfo>>
  },
  setup(props) {
    const { sortInfo, applySort, sortedData, updateData } = useSortedData(props.data);

    const getFieldValue = (dataItem: any, column: ColumnInfo) => {
      switch (column.type) {
        case ColumnType.Date:
          return formatDateFilter(dataItem[column.name]);

        default:
          return dataItem[column.name];
      }
    }

    const sortBy = (column: ColumnInfo) => {
      if (column.sortable) {
        applySort(column);
      }
    }

    watch(() => props.data, (newData) => {
      updateData(newData as any);
      applySort();
    }, { deep: true })

    return {
      props,
      getFieldValue,
      sortBy,
      sortedData,
      sortInfo
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.sortable-header {
  cursor: pointer;
}
</style>
