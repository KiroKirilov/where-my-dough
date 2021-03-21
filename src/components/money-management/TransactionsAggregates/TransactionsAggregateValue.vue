<!-- Template -->
<template>
  <div class="aggregate-container">
    <div class="aggregate-label">{{props.label}}</div>

    <div class="aggregate-value">{{$filters.formatNumber(props.value, props.numberFormat)}}</div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { NumberFormat } from '@/common/enums/NumberFormat';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionsAggregateValue',
  props: {
    value: Number,
    label: String,
    numberFormat: Number as () => NumberFormat
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.aggregate-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 13px;
}
</style>
