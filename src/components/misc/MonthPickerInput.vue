<!-- Template -->
<template>
  <div v-click-outside="hide" class="month-picker-input-container">
    <input
      v-model="selectedDate"
      class="month-picker-input"
      type="text"
      readonly
      @click="toggle()"
    />
    <MPicker v-show="monthPickerVisible" @input="populateInput" :default-month="defaultMonth" :default-year="defaultYear" />
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { MonthPicker as MPicker } from 'vue-month-picker';
import { monthFormatFilter } from '@/filters/dateFilters';

export default defineComponent({
  name: 'MonthPickerInput',
  components: {
    MPicker
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: Date
  },
  setup(props, { emit }) {
    const monthPickerVisible = ref(false);

    const defaultMonth = ref(props.modelValue ? (props.modelValue as any).getMonth() + 1 : undefined);
    const defaultYear = ref(props.modelValue ? (props.modelValue as any).getFullYear() : undefined);

    const selectedDate = computed(() => {
      const dateModel = (props.modelValue as any) as Date;
      return dateModel ? monthFormatFilter(dateModel.getTime()) : '';
    })

    const populateInput = (date: any) => {
      monthPickerVisible.value = false;
      emit('update:modelValue', date.from);
    };

    const toggle = () => {
      monthPickerVisible.value = !monthPickerVisible.value;
    };
    const hide = () => {
      monthPickerVisible.value = false;
    };

    return {
      props,
      hide,
      toggle,
      populateInput,
      monthPickerVisible,
      selectedDate,
      defaultMonth,
      defaultYear
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.month-picker-input-container {
  position: relative;
  width: 180px;
  min-width: 140px;
}
.month-picker-input {
  padding: 1em 1.5em;
  font-size: 0.85em;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.month-picker-input:focus {
  border-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.month-picker__container {
  position: absolute;
  top: 3.5em;
  left: -50% !important;
  top: calc(100% + 5px) !important;
}

</style>
