<!-- Template -->
<template>
  <div class="card hide-overflow mb-3 group-card">
    <div class="card-header group-card-header fw-bold">
      <Skeleton width="80px" height="22px" />
      <Skeleton width="70px" height="22px" />
    </div>

    <div class="card-body group-card-body">
      <div v-for="n in rows" :key="n" class="group-item-container">
        <Skeleton height="25px" />
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import Skeleton from '@/components/misc/Skeleton.vue';
import { getRandomInt } from '@/common/helpers/random';

export default defineComponent({
  name: 'TransactionGroupLoader',
  components: {
    Skeleton
  },
  setup() {
    return {
      rows: getRandomInt(1, 7)
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "@/common/styles/_variables.scss";

.group-card-body {
  padding: 0 !important;
}

.group-item-container {
  padding: 10px 5px;
  display: flex;
  align-items: center;

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
