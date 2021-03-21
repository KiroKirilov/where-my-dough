<!-- Template -->
<template>
  <div class="transactions-scroll">
    <div v-if="props.loading">
      <div v-for="n in loadingGroupsCount" :key="n">
        <TransactionGroupLoader />
      </div>
    </div>

    <div v-if="!props.loading">
      <div v-for="group in groups" v-bind:key="group.key">
        <TransactionGroup
          :groupKey="group.key"
          :items="group.items"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { Transaction } from '@/db/models/transaction';
import TransactionGroup from './TransactionGroup.vue';
import { dateFormatFilter } from '@/filters/dateFilters';
import { groupBy } from '@/common/helpers/grouping';
import ScrollbarHelpers from '@/common/helpers/ScrollbarHelpers';
import TransactionGroupLoader from './Loaders/TransactionGroupLoader.vue';
import { getRandomInt } from '@/common/helpers/random';

export default defineComponent({
  components: {
    TransactionGroup,
    TransactionGroupLoader
  },
  name: 'TransactionsList',
  emits: ['edit', 'delete'],
  props: {
    transactions: Array as PropType<Array<Transaction>>,
    loading: Boolean
  },
  setup(props) {
    const groups = computed(() =>
      groupBy(props.transactions || [], (x) => dateFormatFilter(x.date))
    );
    const scrollbarInitialized = ref(false);

    onMounted(() => {
      if (!scrollbarInitialized.value) {
        ScrollbarHelpers.initScrollbar('.transactions-scroll', {
          alwaysShowScrollbar: 2
        });

        scrollbarInitialized.value = true;
      }
    });

    return {
      props,
      groups,
      loadingGroupsCount: getRandomInt(3, 7)
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.transactions-scroll {
  height: 100%;
}
</style>
