<!-- Template -->
<template>
  <div>
    <div class="setting-label">{{props.label}}</div>
    <SettingInputLoader v-if="props.loading" />
    <div v-if="!props.loading" class="setting-input">
      <div class="input-group-container">
        <div class="input-group input-group-sm has-validaiton-message">
          <span class="input-group-text" v-if="props.preAddon">{{props.preAddon}}</span>
          <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind:class="{'is-invalid': errorMessage}"
            v-bind="props.inputProps"
            :disabled="!isInEdit"
            class="form-control form-control-sm setting-input-element"
          />
          <span class="input-group-text" v-if="props.postAddon">{{props.postAddon}}</span>
          <IconButton
            v-on:click="actionButtonClicked"
            :iconName="isInEdit ? 'save' : 'edit'"
            :buttonType="isInEdit ? 'outline-primary' : 'outline-secondary'"
            class="edit-button"
          />
          <div class="invalid-feedback">{{errorMessage}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import IconButton from '@/components/misc/IconButton.vue';
import SettingInputLoader from './SettingInputLoader.vue';

export default defineComponent({
  name: 'SettingInput',
  components: {
    IconButton,
    SettingInputLoader
  },
  emits: ['update:modelValue', 'save'],
  props: {
    label: String,
    modelValue: String,
    preAddon: String,
    postAddon: String,
    inputProps: Object,
    validator: Function as PropType<(val: string | undefined) => string>,
    loading: Boolean
  },
  setup(props, { emit }) {
    const isInEdit = ref(false);
    const errorMessage = ref('');

    const actionButtonClicked = () => {
      if (isInEdit.value) {
        if (props.validator) {
          const validationResult = props.validator(props.modelValue);
          errorMessage.value = validationResult;

          if (validationResult) {
            return;
          }
        }

        isInEdit.value = false;
        emit('save');
      } else {
        isInEdit.value = true;
      }
    };
    return {
      props,
      isInEdit,
      actionButtonClicked,
      errorMessage
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

.setting-input {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.edit-button {
  height: 36px;
  width: 38px;
  border: 1px solid $dark;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 0.2rem !important;
  border-bottom-right-radius: 0.2rem !important;
}

.setting-label {
  color: $dark-text;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.setting-input-element {
  transition: 0.2s;

  &[disabled] {
    color: $input-group-addon-color;
    background-color: $input-group-addon-bg;
  }
}

.input-group-container {
  width: 100%;
}

.has-validaiton-message {
  height: 59px;
  .form-control,
  .input-group-text {
    height: 36px;
  }
}
</style>
