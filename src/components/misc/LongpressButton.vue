<template>
  <div
    class="longpress-button"
    :class="status"
    @touchend="cancel()"
    @touchstart.prevent="triggerCount()"
    @mouseup="cancel()"
    @mousedown.prevent="triggerCount()"
  >
    <span class="progress-bar" :style="'animation-duration:'+props.duration+'s'"></span>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
let timer = null;
export default {
  name: 'LongpressButton',
  props: ['onConfirm', 'duration', 'value'],
  setup(props) {
    const status = ref('default');
    const counter = ref(0);

    const cancel = () => {
      if (status.value === 'executing') {
        return;
      }
      counter.value = 0;
      clearTimeout(timer);
      status.value = 'default';
    };

    const reset = () => {
      status.value = 'default';
      cancel();
    };

    const countAndConfirm = () => {
      timer = setTimeout(() => {
        counter.value++;
        if (counter.value >= props.duration) {
          clearTimeout(timer);
          if (props.onConfirm) {
            props.onConfirm(props.value || null);
          }

          reset();
          return;
        }
        countAndConfirm();
      }, 1000);
    };

    const triggerCount = () => {
      if (status.value === 'executing' || status.value === 'counting') {
        return;
      }
      status.value = 'counting';
      countAndConfirm();
    };

    onMounted(() => cancel());
    onUnmounted(() => cancel());

    return {
      counter,
      triggerCount,
      cancel,
      status,
      props
    };
  }
};
</script>

<style lang="scss">
.longpress-button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  .progress-bar {
    position: absolute;
    left: 0;
    width: 0;
    top: 0;
    height: 4px;
    background: #fff;
    opacity: 0.4;
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }
  &.counting {
    .progress-bar {
      animation: longpress-progress 3s linear;
    }
  }
  &.executing {
    opacity: 0.5;
    cursor: denied;
  }
}
@keyframes longpress-progress {
  100% {
    width: 100%;
  }
}
</style>
