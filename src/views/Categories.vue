<!-- Template -->
<template>
  <div>
    <PageHeader title="Categories" iconName="labels">
      <IconButton
        v-on:click="setDialogVisible(true)"
        iconName="plus"
        text="Create Category"
        buttonType="success"
        iconClass="new-category-icon"
      />
    </PageHeader>
  </div>

  <div>
    <CategoriesList :categories="categories" />
  </div>

  <CategoriesForm @save="saveCategory" @close="setDialogVisible(false)" :showForm="dialogVisible" />
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, watch } from 'vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import IconButton from '@/components/misc/IconButton.vue';
import CategoriesList from '@/components/categories/CategoriesList.vue';
import CategoriesForm from '@/components/categories/CategoriesForm.vue';
import useAllCategories from '@/composables/categories/useAllCategories';
import useRefWithSetter from '@/composables/useRefWithSetter';
import { Category } from '@/db/models/category';

export default defineComponent({
  name: 'Categories',
  components: {
    PageHeader,
    CategoriesList,
    IconButton,
    CategoriesForm
  },
  setup() {
    const { categories, getAllCategories, categoriesRepo } = useAllCategories();
    const [dialogVisible, setDialogVisible] = useRefWithSetter(false);

    watch(categories, (x) => console.log(x));

    const saveCategory = (category: Category) => {
      categoriesRepo.create(category)
        .then(() => {
          getAllCategories();
          setDialogVisible(false);
        })
    }

    return {
      categories,
      dialogVisible,
      setDialogVisible,
      saveCategory
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
:deep(.new-category-icon) {
  margin-right: 6px;
}
</style>
