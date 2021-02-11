<!-- Template -->
<template>
  <div class="tooltip-host">
    <slot></slot>

    <div class="tooltip-relative">
      <div class="tooltip-content">{{props.content}}</div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import useRefWithSetter from '@/composables/useRefWithSetter';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tooltip',
  props: {
    content: String
  },
  setup(props) {
    const [isVisible, setIsVisible] = useRefWithSetter(false);

    return {
      isVisible,
      setIsVisible,
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";
@import "../../common/styles/functions.scss";

.tooltip-host {
  &:hover {
    .tooltip-content {
      width: 120px;
      color: $white;
      opacity: 1;
      visibility: visible;

      &::after {
        opacity: 1;
        border-width: 5px;
        visibility: visible;
      }
    }
  }
}

.tooltip-relative {
  position: relative;
  width: 0;
  height: 0;
  top: -75%;
  left: 110%;
}

.tooltip-content {
  width: 0px;
  color: transparent;
  background-color: $dark;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  transition: 0.2s;
  transition-property: width, opacity;
  opacity: 0;
  visibility: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 0px;
    border-style: solid;
    border-color: transparent $dark transparent transparent;
    transition: 0.2s;
    transition-property: width, opacity;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
