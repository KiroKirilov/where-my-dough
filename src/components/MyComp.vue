<template>
  <div class="hello">
    <div>{{ msg }}</div>

    <div>Counter: {{ count }}</div>

    <hr />
    <button @click.prevent="increment">Increment</button>
    <button @click.prevent="decrement">Decrement</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class MyComp extends Vue {
  msg!: string;
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
