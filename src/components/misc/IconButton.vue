<!-- Template -->
<template>
  <button
    type="button"
    v-bind:class="`btn btn-${props.buttonType} ${props.buttonSize}`"
    class="icon-button">
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
    buttonSize: {
      type: String,
      validator: function (value: string) {
        return ['large', 'small'].indexOf(value) !== -1;
      },
      default: function () {
        return 'small';
      }
    },
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
            'light',
            'outline-primary',
            'outline-secondary',
            'outline-success',
            'outline-danger',
            'outline-warning',
            'outline-info',
            'outline-dark',
            'outline-light'
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
  font-weight: bold;
  color: $body-color;

  &.small {
    padding: 0px 7px;
  }

  .icon-button-icon {
    font-size: 23px;
    margin-right: 6px;
  }

  .icon-button-text {
    font-size: 14px;
  }
}
</style>
