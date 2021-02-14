<!-- Template -->
<template>
  <div id="popover-content" class="d-none">
    <slot></slot>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Popover } from 'bootstrap';

export default defineComponent({
  name: 'Popover',
  props: {
    isVisible: Boolean,
    target: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const popover = ref<Popover>();

    const showHidePopover = (visible: boolean) => {
      if (popover.value) {
        if (visible) {
          popover.value.show();
        } else {
          popover.value.hide();
        }
      }
    };

    const createPopover = () => {
      const target = document.querySelector(props.target) as Element;
      const content = document.getElementById('popover-content') as Element;

      if (target) {
        popover.value = new Popover(target, {
          html: true,
          title: props.title,
          content: content.innerHTML,
          placement: 'top',
          container: 'body'
        });
      }
    };

    watch(
      () => props.isVisible,
      (newVal) => {
        if (popover.value) {
          showHidePopover(newVal)
        } else {
          createPopover();
          setTimeout(() => {
            showHidePopover(newVal);
          }, 1000);
        }
      }
    );

    onMounted(() => {
      createPopover();
    });

    return {
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
</style>
