<!-- Template -->
<template>
  <div v-click-outside="close" class="select-container">
    <div>
      <div
        v-on:click="toggle"
        class="select-input-container input-group has-validation has-validaiton-message"
      >
        <input
          v-model="searchValue"
          v-bind:placeholder="selectedOptionValue"
          v-bind:class="{'highlight-placeholder': !isOpen, [props.inputClass]: true}"
          class="form-control"
          id="selectInput"
        />

        <div class="chevron-container-relative">
          <Icon name="chevron-down" class="chevron" v-bind:class="{'is-open': isOpen}" />
        </div>
        <div v-if="props.validationMessage" class="invalid-feedback">{{props.validationMessage}}</div>
      </div>

      <div v-if="isOpen" class="options-container">
        <div v-if="!optionsMatchingSearch.length" class="no-options-message">
          <em>No results</em>
        </div>

        <div v-if="optionsMatchingSearch.length" class="option-items">
          <div
            v-for="option in optionsMatchingSearch"
            v-bind:key="option.key"
            v-on:click="handleOptionClick(option)"
            v-bind:class="{'is-selected': option.key === modelValue}"
            class="option-item"
          >
            <Icon
              v-if="option.icon"
              :name="option.icon"
              :color="option.iconColor"
              class="select-option-icon"
            />
            {{option.value}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { Option } from './Option';
import Icon from '@/components/misc/Icon.vue';
import ScrollbarHelpers from '@/common/helpers/ScrollbarHelpers';

export default defineComponent({
  name: 'Select',
  components: {
    Icon
  },
  emits: ['update:modelValue'],
  props: {
    options: Array as PropType<Array<Option>>,
    modelValue: String,
    inputClass: String,
    validationMessage: String
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const searchValue = ref('');
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    const close = () => {
      isOpen.value = false;
    };

    watch(searchValue, () => {
      if (!isOpen.value) {
        isOpen.value = true;
      }
    });

    const optionsMatchingSearch = computed(() => {
      const cleanSearchValue = (searchValue.value || '').trim();

      return (props.options || []).filter((x) =>
        x.value.includes(cleanSearchValue)
      );
    });

    watch(isOpen, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          ScrollbarHelpers.initScrollbar('.option-items');
        }, 100);
      }
    });

    const handleOptionClick = (clickedOption: Option) => {
      isOpen.value = false;
      emit('update:modelValue', clickedOption.key);
    };

    const selectedOptionValue = computed(() => {
      return props.options?.find((x) => x.key === props.modelValue)?.value;
    });

    return {
      props,
      isOpen,
      toggle,
      searchValue,
      optionsMatchingSearch,
      handleOptionClick,
      selectedOptionValue,
      close
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";

.select-container {
  width: 100%;
}

.chevron-container-relative {
  position: relative;
  width: 0;
  height: 0;
  top: 9%;
  right: 11%;
  z-index: 99;
}

.chevron {
  font-size: 30px;
  color: $gray-800;
  transition: 0.3s;

  &.is-open {
    transform: rotate(-180deg);
  }
}

.select-input-container {
  height: 36px;
}

.options-container {
  position: absolute;
  width: 100%;
  background-color: $gray-800;
  border: 1px solid $dark;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  z-index: 99;
  top: calc(100% - 0);
}

.no-options-message {
  font-size: 14px;
}

.option-items {
  max-height: 180px;
  overflow: hidden;
}

.option-item {
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: $gray-700;
  }

  &.is-selected {
    background-color: $gray-700;
  }
}

.highlight-placeholder {
  &::placeholder {
    color: $input-color;
    opacity: 1;
  }
}

.select-option-icon {
  margin-right: 5px;
  font-size: 22px;
}

.is-invalid {
  background-image: none !important;

  & + .chevron-container-relative {
    .chevron {
      color: $danger;
    }
  }
}

#selectInput {
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
}
</style>
