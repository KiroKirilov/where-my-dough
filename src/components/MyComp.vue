<template>
  <div class="hello mb-3">
    <div>{{ props.msg }}</div>

    <div>Counter: {{ count }}</div>

    <hr />
    <button @click.prevent="increment" class="btn btn-success mx-3">Increment</button>
    <button @click.prevent="decrement" class="btn btn-danger">Decrement</button>

    <hr />
    <button @click.prevent="createItem" class="btn btn-info mr-3">Create</button>
    <button @click.prevent="createExpense" class="btn btn-info">Create Expense</button>
    <br />
    <br />
    <div v-for="item in items" :key="item.message">{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useCounter from '@/composables/useCounter';
import { CategoriesRepository } from '@/db/repositories/categoriesRepository';
import { Category } from '@/db/models/category';
const repo = new CategoriesRepository();

export default defineComponent({
  name: 'My Comp',
  props: {
    msg: String
  },
  setup(props) {
    const { count, increment, decrement } = useCounter();
    const items = ref<Category[]>([]);

    onMounted(() => {
      repo.getAll()
        .then((res) => {
          items.value = res;
        });
    });

    const createItem = () => {
      repo.create({
        name: 'My Category'
      });
    };

    const createExpense = () => {
      console.log('hi')
    };

    return {
      count,
      increment,
      decrement,
      createItem,
      createExpense,
      items,
      props
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
