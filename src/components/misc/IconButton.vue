<!-- Template -->
<template>
  <button type="button" v-bind:class="'btn btn-' + props.buttonType" class="icon-button">
    <Icon v-if="props.iconName" class="icon-button-icon" :name="props.iconName" />
    <div class="icon-button-text">{{props.text}}</div>
  </button>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/misc/Icon.vue';

export default defineComponent({
  name: 'Icon Button',
  components: {
    Icon
  },
  props: {
    iconName: String,
    text: String,
    buttonType: {
      type: String,
      validator: function (value: string) {
        return (
          [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'dark',
            'light'
          ].indexOf(value) !== -1
        );
      },
      default: function () {
        return 'primary';
      }
    }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

.icon-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 7px;
  font-weight: bold;
  color: $body-color;

  .icon-button-icon {
    font-size: 23px;
    margin-right: 6px;
  }

  .icon-button-text {
    font-size: 14px;
  }
}
</style>
