<!-- Template -->
<template>
  <div id="dialog" class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div v-if="!$slots.header" class="modal-header">
          <h5 class="modal-title">{{ props.title }}</h5>
          <Icon v-on:click="$emit('close')" name="close" class="close-dialog-icon" />
        </div>

        <div v-if="$slots.header" class="modal-header">
          <slot name="header"></slot>
        </div>

        <div v-if="$slots.body" class="modal-body">
          <slot name="body"></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import Icon from '@/components/misc/Icon.vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  name: 'Dialog',
  components: {
    Icon
  },
  emits: ['close'],
  props: {
    isVisible: Boolean,
    title: {
      type: String,
      default: () => 'Dialog'
    }
  },
  setup(props) {
    const modal = ref<Modal>();

    watch(
      () => props.isVisible,
      (newVal) => {
        console.log(newVal);

        if (modal.value) {
          if (newVal) {
            modal.value.show();
          } else {
            modal.value.hide();
          }
        }
      }
    );

    onMounted(() => {
      const element = document.getElementById('dialog') as Element;
      modal.value = new Modal(element, {
        backdrop: 'static'
      });
      modal.value.hide();
    });

    return {
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.close-dialog-icon {
  cursor: pointer;
  font-size: 25px;
}
</style>
