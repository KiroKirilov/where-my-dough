<!-- Template -->
<template>
  <Dialog @close="$emit('close')" :isVisible="props.showForm" :title="dialogTitle">
    <template v-slot:footer>
      <div class="form-buttons-container">
        <IconButton
          v-on:click="$emit('close')"
          class="form-button"
          text="Close"
          iconName="close"
          buttonType="outline-light"
          buttonSize="large"
        />

        <IconButton
          class="form-button"
          text="Save"
          iconName="save"
          buttonType="outline-primary"
          buttonSize="large"
        />
      </div>
    </template>
  </Dialog>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Dialog from '@/components/misc/Dialog.vue';
import { Category } from '@/db/models/category';
import IconButton from '@/components/misc/IconButton.vue';

export default defineComponent({
  name: 'Categories Form',
  components: {
    Dialog,
    IconButton
  },
  emits: ['close'],
  props: {
    showForm: Boolean,
    model: Category
  },
  setup(props) {
    const dialogTitle = computed(() =>
      props.model ? 'Edit Category' : 'New Category'
    );

    return {
      dialogTitle,
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.buttons-container {
  display: flex;
}

.form-button {
  width: 81px;
  margin: 0 5px;
}
</style>
