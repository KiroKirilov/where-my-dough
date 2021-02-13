<!-- Template -->
<template>
  <i v-bind:class="'zmdi zmdi-' + props.name"></i>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    name: String
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
</style>
