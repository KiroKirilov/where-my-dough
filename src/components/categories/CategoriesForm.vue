<!-- Template -->
<template>
  <Dialog
    @close="$emit('close')"
    :isVisible="props.showForm"
    :title="dialogTitle"
    :headerIcon="dialogIcon"
  >
    <template v-slot:body>
      <div class="form-container">
        <div class="col-6">
          <label for="nameInput" class="form-label">Name</label>
          <div class="input-group has-validation has-validaiton-message">
            <input
              v-model="name"
              v-bind:class="{'is-invalid': valdiationErrors.name}"
              class="form-control"
              type="text"
              id="nameInput"
              placeholder="e.g. taxes"
              required
            />
            <div class="invalid-feedback">Please name this category.</div>
          </div>
        </div>
        <div class="col-6">
          <div>
            <label class="form-label">Icon</label>
          </div>
          <div class="category-icon-container">
            <IconPicker v-model="icon" :selectedIconColor="iconColor" />

            <input
              v-model="iconColor"
              type="color"
              class="form-control form-control-color icon-color-picker"
              id="icon-color"
            />
          </div>
        </div>
      </div>
    </template>

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
          v-on:click="handleSave"
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
import { computed, defineComponent, ref, watch } from 'vue';
import Dialog from '@/components/misc/Dialog.vue';
import { Category } from '@/db/models/category';
import IconButton from '@/components/misc/IconButton.vue';
import IconPicker from '@/components/misc/IconPicker.vue';
import useDebouncedRef from '@/composables/useDebouncedRef';

export default defineComponent({
  name: 'Categories Form',
  components: {
    Dialog,
    IconButton,
    IconPicker
  },
  emits: ['close', 'save'],
  props: {
    showForm: Boolean,
    model: Category
  },
  setup(props, { emit }) {
    const dialogTitle = computed(() =>
      props.model ? 'Edit Category' : 'New Category'
    );
    const dialogIcon = computed(() => (props.model ? 'edit' : 'plus-circle'));
    const icon = ref('money');
    const iconColor = useDebouncedRef('#ffffff');
    const name = ref('');
    const valdiationErrors = ref<any>({})

    watch(() => props.showForm, () => {
      valdiationErrors.value = {};
    })

    const handleSave = () => {
      if (!name.value) {
        valdiationErrors.value.name = true;
        return;
      } else {
        valdiationErrors.value.name = false;
      }

      const model = {
        name: name.value,
        icon: icon.value,
        iconColor: iconColor.value
      };

      emit('save', model)
    };

    return {
      props,
      dialogTitle,
      dialogIcon,
      icon,
      iconColor,
      name,
      handleSave,
      valdiationErrors
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

.form-buttons-container {
  display: flex;
}

.form-button {
  width: 81px;
  margin: 0 5px;
}

.category-icon-container {
  display: flex;
  align-items: center;
}

.category-icon-label {
  margin-right: 10px;
}

.icon-color-picker {
  width: 40px;
  border-color: $primary;
  background-color: transparent;
  margin-left: 10px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: $primary;
  }
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.has-validaiton-message {
  height: 59px;
  .form-control {
    height: 36px;
  }
}
</style>
