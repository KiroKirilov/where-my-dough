<template>
  <PageWithHeader headerTitle="Money Management" headerIconName="money">
    <template v-slot:content>
      <div>
        hi
      </div>
    </template>
  </PageWithHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWithHeader from '@/components/layout/PageWithHeader.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PageWithHeader
  }
})
</script>
