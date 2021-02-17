import { ColumnInfo } from '@/components/misc/Grid/ColumnInfo';
import { ColumnType } from '@/components/misc/Grid/ColumnType';
import { SortDirection } from '@/components/misc/Grid/SortDirection';
import { SortInfo } from '@/components/misc/Grid/SortInfo';
import { ref, computed, Ref } from 'vue'

export default function useSortedData(data: Ref<any[] | undefined>) {
  const sortInfo = ref<SortInfo>({ column: undefined, direction: SortDirection.asc });
  const sortedData = computed(() => {
    if (!sortInfo.value.column || !data.value) {
      return data.value;
    }

    return data.value.sort((a, b) => {
      const sortDirection = sortInfo.value.direction;
      const sortColumn = sortInfo.value.column;
      const valueA = a[sortColumn?.name || ''];
      const valueB = b[sortColumn?.name || ''];

      switch (sortInfo.value?.column?.type) {
        case ColumnType.String:
          return sortDirection === SortDirection.asc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

        default:
          return sortDirection === SortDirection.asc ? valueA - valueB : valueB - valueA;
      }
    });
  });

  const applySort = (newColumn?: ColumnInfo) => {
    const oldColumn = sortInfo.value.column;
    sortInfo.value = {
      column: newColumn,
      direction: newColumn?.name === oldColumn?.name && sortInfo.value.direction === SortDirection.asc ? SortDirection.desc : SortDirection.asc
    };
  }

  return {
    sortInfo,
    sortedData,
    applySort
  }
}
