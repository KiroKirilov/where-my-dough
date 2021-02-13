<!-- Template -->
<template>
  <div>
    <PageHeader title="Categories" iconName="labels">
      <IconButton
        v-on:click="onCreateNew"
        iconName="plus"
        text="Create Category"
        buttonType="success"
        data-bs-toggle="modal" data-bs-target="#exampleModal"
      />
    </PageHeader>
  </div>

  <div>
    <CategoriesList :categories="categories" />
  </div>

  <CategoriesForm />
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, watch } from 'vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import IconButton from '@/components/misc/IconButton.vue';
import CategoriesList from '@/components/categories/CategoriesList.vue';
import CategoriesForm from '@/components/categories/CategoriesForm.vue';
import useAllCategories from '@/composables/categories/useAllCategories';

export default defineComponent({
  name: 'Categories',
  components: {
    PageHeader,
    CategoriesList,
    IconButton,
    CategoriesForm
  },
  setup() {
    const { categories } = useAllCategories();

    const onCreateNew = () => {
      console.log('create new');
    };

    watch(categories, (x) => console.log(x));

    return {
      categories,
      onCreateNew
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
</style>
