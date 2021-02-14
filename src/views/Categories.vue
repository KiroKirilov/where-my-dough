<!-- Template -->
<template>
  <div>
    <PageHeader title="Categories" iconName="labels">
      <IconButton
        v-on:click="createdClicked"
        iconName="plus"
        text="Create Category"
        buttonType="success"
        iconClass="new-category-icon"
      />
    </PageHeader>
  </div>

  <div>
    <CategoriesList :categories="categories" @edit="editClicked" />
  </div>

  <CategoriesForm @save="saveCategory" @close="setDialogVisible(false)" :showForm="dialogVisible" :model="model" />
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
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
    const model = ref<Category | null>(null);

    watch(categories, (x) => console.log(x));

    const saveCategory = (category: Category) => {
      if (category._id) {
        categoriesRepo.update(category)
          .then(() => {
            getAllCategories();
            setDialogVisible(false);
          })
      } else {
        categoriesRepo.create(category)
          .then(() => {
            getAllCategories();
            setDialogVisible(false);
          })
      }
    }

    const createdClicked = () => {
      model.value = null;
      setDialogVisible(true);
    }

    const editClicked = (category: Category) => {
      model.value = category;
      console.log(category);
      setDialogVisible(true);
    }

    return {
      categories,
      dialogVisible,
      setDialogVisible,
      saveCategory,
      model,
      editClicked,
      createdClicked
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
