<!-- Template -->
<template>
  <span v-bind:class="{invisible: props.sortInfo?.column?.name !== props.column?.name}">
    <Icon v-if="!isString" :name="isAsc ? 'sort-amount-asc' : 'sort-amount-desc'" class="sort-icon" />
    <Icon v-if="isString" :name="isAsc ? 'sort-asc' : 'sort-desc'" class="sort-icon" />
  </span>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ColumnInfo } from './ColumnInfo';
import { SortInfo } from './SortInfo';
import Icon from '@/components/misc/Icon.vue';
import { SortDirection } from './SortDirection';
import { ColumnType } from './ColumnType';

export default defineComponent({
  name: 'SortArrow',
  components: {
    Icon
  },
  props: {
    sortInfo: Object as () => SortInfo,
    column: Object as () => ColumnInfo
  },
  setup(props) {
    const isAsc = computed(() => props.sortInfo?.direction === SortDirection.asc);
    const isString = computed(() => props.sortInfo?.column?.type === ColumnType.String);

    return {
      props,
      isAsc,
      isString
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.sort-icon {
  width: 12px;
  margin-left: 3px;
}
</style>
