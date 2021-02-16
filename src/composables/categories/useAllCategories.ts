
import { Category } from '@/db/models/category';
import { CategoriesRepository } from '@/db/repositories/categoriesRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { onMounted, ref } from 'vue';

const categoriesRepo = RepositoryFactory.createInstance(CategoriesRepository);

export default function useAllCategories() {
  const categories = ref<Category[]>([]);
  const categoriesError = ref(false);
  const loading = ref(false);

  const getAllCategories = async () => {
    try {
      loading.value = true;
      categories.value = await categoriesRepo.getAll();
      loading.value = false;
    } catch (error) {
      console.error(error);
      categoriesError.value = true;
      loading.value = false;
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
