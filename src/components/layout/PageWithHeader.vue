<!-- Template -->
<template>
  <div>
    <div>
      <PageHeader v-if="$slots.header"  :title="props.headerTitle" :showSeparator="props.showHeaderSeparator" :iconName="props.headerIconName">
        <slot name="header"></slot>
      </PageHeader>

      <PageHeader v-if="!$slots.header"  :title="props.headerTitle" :showSeparator="props.showHeaderSeparator" :iconName="props.headerIconName" />
    </div>

    <div class="page-content">
      <slot v-if="$slots.content" name="content"></slot>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from './PageHeader.vue';

export default defineComponent({
  name: 'PageWithHeader',
  components: {
    PageHeader
  },
  props: {
    headerTitle: String,
    headerIconName: String,
    showHeaderSeparator: {
      type: Boolean,
      default: true
    }
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
.page-content {
  height: calc(100vh - 77px);
}
</style>
