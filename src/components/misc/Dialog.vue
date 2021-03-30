<!-- Template -->
<template>
  <div id="dialog" class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <PageHeader v-if="!$slots.header" :title="props.title" :showSeparator="false" :iconName="props.headerIcon" class="dialog-header">
          <div>
            <Icon v-on:click="$emit('close')" name="close" class="close-dialog-icon" />
          </div>
        </PageHeader>

        <div v-if="$slots.header" class="modal-header dialog-header">
          <slot name="header"></slot>
        </div>

        <div v-if="$slots.body" class="modal-body dialog-body">
          <slot name="body"></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer dialog-footer">
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
import PageHeader from '@/components/layout/PageHeader.vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  name: 'Dialog',
  components: {
    Icon,
    PageHeader
  },
  emits: ['close'],
  props: {
    isVisible: Boolean,
    headerIcon: String,
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
        backdrop: 'static',
        keyboard: false
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
@import "../../common/styles/_variables.scss";

.close-dialog-icon {
  cursor: pointer;
  font-size: 25px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
}

.dialog-body,
.dialog-footer {
  background-color: $body-bg !important;
}
</style>
