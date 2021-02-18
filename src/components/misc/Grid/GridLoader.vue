<!-- Template -->
<template>
  <div>
    <div class="grid-header">
      <div
      class="grid-header-cell"
        v-for="col in props.columns"
        v-bind:key="col"
        scope="col"
        v-bind:style="{ width: (col.widthPercent || columnWidth) + '%'}"
      >
        <div class="loader-container">
          <Skeleton height="22px" />
        </div>
      </div>
    </div>

    <div class="grid-body">
      <div class="grid-row" v-for="index in props.rows" :key="index">
        <div
          class="grid-cell"
          v-for="col in props.columns"
          v-bind:key="col"
          scope="col"
          v-bind:style="{ width: (col.widthPercent || columnWidth) + '%'}"
        >
          <div class="loader-container">
            <Skeleton height="30px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ColumnInfo } from './ColumnInfo';
import Skeleton from '@/components/misc/Skeleton.vue';

export default defineComponent({
  name: 'GridLoader',
  components: {
    Skeleton
  },
  props: {
    rows: Number,
    columns: Array as PropType<Array<ColumnInfo>>
  },
  setup(props) {
    return {
      props
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";

.grid-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid $body-color;
  width: calc(100% - 16px);
}

.grid-header-cell {
  padding: 8px;
}

.grid-row {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 16px);

  &:nth-child(odd) {
    background-color: $table-striped-bg;
  }
}

.grid-cell {
  display: flex;
  align-items: center;
  padding: 8px;
}

.loader-container {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
