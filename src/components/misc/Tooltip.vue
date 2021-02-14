<!-- Template -->
<template>
  <div class="tooltip-host">
    <slot></slot>

    <div class="tooltip-relative" v-bind:class="placementClass">
      <div class="tooltip-content" v-bind:class="placementClass">{{props.content}}</div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Tooltip',
  props: {
    content: String,
    placement: {
      type: String,
      validator: (value: string) => ['right', 'top'].indexOf(value) !== -1,
      default: () => 'right'
    }
  },
  setup(props) {
    const placementClass = computed(() => `placement-${props.placement}`);

    return {
      props,
      placementClass
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
      width: max-content;
      color: $body-color;
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

  &.placement-right {
    left: calc(100% + 10px);
    top: -80%;
  }

  &.placement-top {
    left: -73%;
    top: calc(-150% - 10px);
  }
}

.tooltip-content {
  width: 0px;
  color: transparent;
  background-color: $dark;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: fixed;
  z-index: 1;
  transition: 0.2s;
  transition-property: width, opacity;
  opacity: 0;
  visibility: hidden;
  padding: 0 10px;
  padding-bottom: 5px;
  padding-top: 2px;

  &.placement-right {
    &::after {
      border-color: transparent $dark transparent transparent;
      top: 50%;
      right: 100%;
    }
  }

  &.placement-top {
    &::after {
      border-color: $dark transparent transparent transparent;
      top: 119%;
      left: 46%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    margin-top: -5px;
    border-width: 0px;
    border-style: solid;
    transition: 0.2s;
    transition-property: width, opacity;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
