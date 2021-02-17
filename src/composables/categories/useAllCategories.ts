
import { sleep } from '@/common/helpers/sleep';
import { Category } from '@/db/models/category';
import { CategoriesRepository } from '@/db/repositories/categoriesRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { onMounted, ref } from 'vue';

const categoriesRepo = RepositoryFactory.createInstance(CategoriesRepository);

export default function useAllCategories() {
  const categories = ref<Category[]>([]);
  const categoriesError = ref(false);
  const loading = ref(false);

  const stopLoading = async() => {
    // it's too fast otherwise and it looks janky
    await sleep(700);
    loading.value = false;
  }

  const getAllCategories = async () => {
    try {
      loading.value = true;
      categories.value = await categoriesRepo.getAll();
      stopLoading();
    } catch (error) {
      console.error(error);
      categoriesError.value = true;
      stopLoading();
    }
  }

  onMounted(getAllCategories);

  return {
    categories,
    getAllCategories,
    categoriesRepo,
    categoriesError,
    loading
  }
}
