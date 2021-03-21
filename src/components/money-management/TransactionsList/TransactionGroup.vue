<!-- Template -->
<template>
  <div class="card hide-overflow mb-3 group-card">
    <div class="card-header group-card-header fw-bold">
      <div>{{props.groupKey}}</div>
      <div>{{$filters.formatNumber(total)}}</div>
    </div>
    <div class="card-body group-card-body">
      <div class="group-item-container" v-for="item in props.items" v-bind:key="item._id">
        <TransactionGroupItem :transaction="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { Transaction } from '@/db/models/transaction';
import { defineComponent, PropType, toRefs } from 'vue';
import TransactionGroupItem from './TransactionGroupItem.vue';
import useTransactionsSum from '@/composables/transactions/useTransactionsSum';

export default defineComponent({
  name: 'TransactionGroup',
  components: {
    TransactionGroupItem
  },
  emits: ['edit', 'delete'],
  props: {
    groupKey: String,
    items: Array as PropType<Array<Transaction>>
  },
  setup(props) {
    const { items } = toRefs(props);
    const total = useTransactionsSum(items);

    return {
      props,
      total
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";

.group-card-body {
  padding: 0 !important;
}

.group-item-container {
  &:nth-child(even) {
    background-color: $gray-700;
  }
}

.hide-overflow {
  overflow: hidden;
}

.group-card-header {
  border-bottom: 1px solid $white;
  padding-right: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group-card {
  border-color: $dark;
}
</style>
