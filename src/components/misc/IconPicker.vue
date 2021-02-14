<!-- Template -->
<template>
  <div>
    <IconButton
      class="selected-icon"
      buttonSize="large"
      buttonType="outline-primary"
      :iconName="props.modelValue"
      v-on:click="togglePickerVisible"
      :iconColor="props.selectedIconColor"
    />

    <div class="icon-picker-container-relative">
      <div v-bind:class="{'picker-visible': pickerVisible}" class="icon-picker-container">
        <div class="container px-0">
          <div class="row px-2 pt-2">
            <div class="col-12">
              <input
                v-model="searchQuery"
                class="form-control form-control-sm"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>

          <div class="picker-icons-container">
            <div class="align-icons">
              <div
                v-for="icon in iconsMatchingSearchQuery"
                v-bind:key="icon"
                class="col-2 picker-icon-button-col"
              >
                  <Tooltip :content="icon" class="icon-tooltip">
                    <IconButton
                      :iconName="icon"
                      buttonType="outline-secondary"
                      class="picker-icon-button"
                      v-on:click="chooseNewIcon(icon)"
                    />
                  </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
import useFilteredIconsList from '@/composables/useFilteredIconsList';
import IconButton from '@/components/misc/IconButton.vue';
import Tooltip from '@/components/misc/Tooltip.vue';
import ScrollbarHelpers from '@/common/helpers/ScrollbarHelpers';

export default defineComponent({
  name: 'Icon Picker',
  components: {
    IconButton,
    Tooltip
  },
  props: {
    modelValue: String,
    selectedIconColor: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { searchQuery, iconsMatchingSearchQuery } = useFilteredIconsList();
    const pickerVisible = ref(false);

    const togglePickerVisible = () => {
      pickerVisible.value = !pickerVisible.value;
      if (pickerVisible.value) {
        setTimeout(() => {
          ScrollbarHelpers.initScrollbar('.picker-icons-container');
        }, 100);
      }
    };

    const chooseNewIcon = (newIcon: string) => {
      pickerVisible.value = false;
      console.log(newIcon);
      emit('update:modelValue', newIcon);
    }

    return {
      iconsMatchingSearchQuery,
      searchQuery,
      togglePickerVisible,
      pickerVisible,
      chooseNewIcon,
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";
$pickerBg: #45484a;

.icon-picker-container-relative {
  position: relative;
  width: 0;
  height: 0;
  // 15vw is half the width, 21px is approx half the button's width
  left: calc(-15vw + 21px);
  top: 15px;
}

.icon-picker-container {
  position: absolute;
  width: 30vw;
  background-color: $pickerBg;
  border-radius: 5px;
  opacity: 0;
  transition: 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent $pickerBg transparent;
  }

  &.picker-visible {
    opacity: 1;
  }
}

.picker-icons-container {
  padding: 5px;
  height: 30vh;
  max-height: 300px;
  overflow-y: hidden;
}

.picker-icon-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
}

.picker-icon-button-col {
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.align-icons {
  display: flex;
  flex-wrap: wrap;
}

.icon-tooltip {
  height: 100%;
}

.selected-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
