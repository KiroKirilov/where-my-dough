<!-- Template -->
<template>
  <div>
    <div class="grid-header">
      <div
      class="grid-header-cell"
        v-for="col in props.columns"
        v-bind:key="col"
        v-bind:class="{'sortable-header': col.sortable}"
        v-on:click="sortBy(col)"
        scope="col"
        v-bind:style="{ width: (col.widthPercent || columnWidth) + '%'}"
      >
        <div v-if="$slots[`header-${col.name}`]">
          <slot :name="`header-${col.name}`"></slot>
        </div>

        <template v-if="!$slots[`header-${col.name}`]">
          {{ col.title || col.name }}
          <SortArrow :column="col" :sortInfo="sortInfo" />
        </template>
      </div>
    </div>

    <div class="grid-body">
      <div class="grid-row" v-for="dataItem in sortedData" :key="dataItem">
        <div
          class="grid-cell"
          v-for="col in props.columns"
          v-bind:key="col"
          scope="col"
          v-bind:style="{ width: (col.widthPercent || columnWidth) + '%'}"
        >
          <div v-if="$slots[`cell-${col.name}`]">
            <slot :name="`cell-${col.name}`" :dataItem="dataItem"></slot>
          </div>

          <template v-if="!$slots[`cell-${col.name}`]">{{ getFieldValue(dataItem, col) }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, watch } from 'vue';
import { ColumnInfo } from './ColumnInfo';
import formatDateFilter from '@/filters/formatDateFilter';
import { ColumnType } from './ColumnType';
import useSortedData from '@/composables/grid/useSortedData';
import SortArrow from './SortArrow.vue';
import ScrollbarHelpers from '@/common/helpers/ScrollbarHelpers';

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
    const { sortInfo, applySort, sortedData, updateData } = useSortedData(
      props.data
    );

    const getFieldValue = (dataItem: any, column: ColumnInfo) => {
      switch (column.type) {
        case ColumnType.Date:
          return formatDateFilter(dataItem[column.name]);

        default:
          return dataItem[column.name];
      }
    };

    const sortBy = (column: ColumnInfo) => {
      if (column.sortable) {
        applySort(column);
      }
    };

    const columnWidth = computed(() => 100 / (props.columns?.length || 1));

    watch(
      () => props.data,
      (newData) => {
        updateData(newData as any);
        applySort();
      },
      { deep: true }
    );

    onMounted(() => {
      ScrollbarHelpers.initScrollbar('.grid-body', {
        alwaysShowScrollbar: 2
      });
    });

    return {
      props,
      getFieldValue,
      sortBy,
      sortedData,
      sortInfo,
      columnWidth
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";
@import "../../../common/styles/constants.scss";
$gridHeaderHeight: 40px;

.sortable-header {
  cursor: pointer;
}

.grid-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid $body-color;
  width: calc(100% - 15px);
}

.grid-header-cell {
  padding: 8px;
}

.grid-body {
  height: calc(100vh - #{$titleBarHeight} - #{$pageHeaderHeight} - #{$gridHeaderHeight});
}

.grid-row {
  display: flex;
  justify-content: space-between;

  &:nth-child(odd) {
    background-color: $table-striped-bg;
  }
}

.grid-cell {
  display: flex;
  align-items: center;
  padding: 8px;
}
</style>
