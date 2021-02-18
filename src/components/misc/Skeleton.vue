<!-- Template -->
<template>
  <div class="skeleton-box" v-bind:style="{height: props.height, width: props.width}"></div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  props: {
    height: {
      type: String,
      default: () => '1.5em'
    },
    width: {
      type: String,
      default: () => '100%'
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
@import "../../common/styles/_variables.scss";

.skeleton-box {
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: hsla(0, 0%, 100%, 0.12);
  border-radius: 5px;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.05),
      hsla(0, 0%, 100%, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
