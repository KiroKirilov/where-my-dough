<!-- Template -->
<template>
  <div class="page-header">
    <div class="page-header-icon">
      <Icon :name="props.iconName" />
    </div>

    <div class="page-header-title">
      {{props.title}}
    </div>

    <div v-if="$slots.default" class="additional-content-separator"></div>

    <slot></slot>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/misc/Icon.vue';

export default defineComponent({
  name: 'Page Header',
  components: {
    Icon
  },
  props: {
    title: String,
    iconName: String
  },
  setup(props) {
    return {
      props,
      console: console
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

.page-header {
  background-color: $gray-800;
  width: 100%;
  padding: 5px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 1px 0 rgba(2,2,3,0.2),0 1.5px 0 rgba(4,4,5,0.05),0 2px 0 rgba(2,2,3,0.05);
  margin-bottom: 1px;
  height: 47px;
}

.page-header-icon {
  font-size: 25px;
  color: $light;
  margin-right: 10px;
}

.page-header-title {
  font-weight: bold;;
}

.additional-content-separator {
  background-color: $light;
  height: 50%;
  width: 2px;
  margin: 0 10px;
  border-radius: 10px;
}
</style>
