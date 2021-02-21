<!-- Template -->
<template>
  <Skeleton width="100%" height="36px" style="margin-bottom: 18px" />
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import Skeleton from '@/components/misc/Skeleton.vue';

export default defineComponent({
  name: 'SettingInputLoader',
  components: {
    Skeleton
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">

</style>
