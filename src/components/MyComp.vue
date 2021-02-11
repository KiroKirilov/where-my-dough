<template>
  <div class="hello">
    <div>{{ props.msg }}</div>

    <div>Counter: {{ count }}</div>

    <hr />
    <button @click.prevent="increment">Increment</button>
    <button @click.prevent="decrement">Decrement</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useCounter from '@/composables/useCounter';

export default defineComponent({
  name: 'My Comp',
  props: {
    msg: String
  },
  setup(props) {
    const { count, increment, decrement } = useCounter();

    return {
      count,
      increment,
      decrement,
      props
    };
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
