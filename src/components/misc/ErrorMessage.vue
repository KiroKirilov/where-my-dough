<!-- Template -->
<template>
  <div class="alert alert-danger error-message" role="alert">
    <Icon name="alert-triangle" class="error-message-icon" />
    <div>{{ props.message }}</div>
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
    message: String
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
.error-message {
  display: flex;
  align-items: center;
  padding: 5px 1rem;
}

.error-message-icon {
  font-size: 28px;
  margin-right: 10px;
}
</style>
