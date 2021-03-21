<!-- Template -->
<template>
  <div class="alert alert-danger error-message" role="alert">
    <Icon name="alert-triangle" class="error-message-icon" />
    <div class="error-message-text">{{ props.message }}</div>

    <div v-if="props.onRetry" class="additional-content-separator"></div>

    <Icon
      v-if="props.onRetry"
      v-on:click="props.onRetry"
      name="refresh"
      class="error-message-icon retry-icon"
      v-bind:class="{'in-progress': props.retrying}"
    />
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/misc/Icon.vue';

export default defineComponent({
  name: 'ErrorMessage',
  components: {
    Icon
  },
  props: {
    message: String,
    onRetry: Function,
    retrying: Boolean
  },
  inheritAttrs: false,
  setup(props) {
    return {
      props,
      console
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

.error-message {
  display: flex;
  align-items: center;
  padding: 5px 1rem;
}

.error-message-icon {
  font-size: 28px;
  margin-right: 10px;

  &.retry-icon {
    margin-right: 0;
    cursor: pointer;

    &.in-progress {
      animation: rotating 1.5s linear infinite;
      margin-top: -3px;
    }
  }
}

.error-message-text {
  width: 86%;
}

.additional-content-separator {
  background-color: darken($danger, 10%);
  height: 25px;
  width: 2px;
  margin: 0 15px;
  border-radius: 10px;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
