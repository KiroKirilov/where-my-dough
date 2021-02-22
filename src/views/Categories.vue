<!-- Template -->
<template>
  <PageWithHeader headerTitle="Categories" headerIconName="labels">
    <template v-slot:header>
      <IconButton
        v-on:click="createdClicked"
        iconName="plus"
        text="Create Category"
        buttonType="success"
        iconClass="new-category-icon"
        :loading="loading"
      />
    </template>

    <template v-slot:content>
      <div>
        <div>
          <CategoriesList
            v-if="!categoriesError"
            :categories="categories"
            :loading="loading"
            @edit="editClicked"
            @delete="deleteClicked"
          />
        </div>

        <div v-if="categoriesError">
          <ErrorMessage
            class="categories-error"
            message="An error ocurred while fetching your categories :/"
            :onRetry="getAllCategories"
            :retrying="loading"
          />
        </div>
      </div>

      <CategoriesForm
        @save="saveCategory"
        @close="setDialogVisible(false)"
        :showForm="dialogVisible"
        :model="model"
      />
    </template>
  </PageWithHeader>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
import PageWithHeader from '@/components/layout/PageWithHeader.vue';
import IconButton from '@/components/misc/IconButton.vue';
import ErrorMessage from '@/components/misc/ErrorMessage.vue';
import CategoriesList from '@/components/categories/CategoriesList.vue';
import CategoriesForm from '@/components/categories/CategoriesForm.vue';
import useAllCategories from '@/composables/categories/useAllCategories';
import useRefWithSetter from '@/composables/useRefWithSetter';
import { Category } from '@/db/models/category';

export default defineComponent({
  name: 'Categories',
  components: {
    PageWithHeader,
    CategoriesList,
    IconButton,
    CategoriesForm,
    ErrorMessage
  },
  setup() {
    const {
      categories,
      getAllCategories,
      categoriesRepo,
      categoriesError,
      loading
    } = useAllCategories();
    const [dialogVisible, setDialogVisible] = useRefWithSetter(false);
    const model = ref<Category | null>(null);

    const saveCategory = async (category: Category) => {
      if (category._id) {
        await categoriesRepo.update(category);
      } else {
        await categoriesRepo.create(category);
      }

      getAllCategories();
      setDialogVisible(false);
    };

    const createdClicked = () => {
      model.value = null;
      setDialogVisible(true);
    };

    const editClicked = (category: Category) => {
      model.value = category;
      setDialogVisible(true);
    };

    const deleteClicked = (category: Category) => {
      if (category?._id) {
        categoriesRepo.delete(category).then(() => {
          getAllCategories();
        });
      }

      // TODO: Update expenses for this category
    };

    return {
      categories,
      dialogVisible,
      setDialogVisible,
      saveCategory,
      model,
      editClicked,
      createdClicked,
      categoriesError,
      loading,
      deleteClicked,
      getAllCategories
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
:deep(.new-category-icon) {
  margin-right: 6px;
}

.categories-error {
  margin-top: 10px;
}

.categories-loader {
  width: 3rem;
  height: 3rem;
}

.categories-loader-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
