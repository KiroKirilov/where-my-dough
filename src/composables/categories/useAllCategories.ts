
import { Category } from '@/db/models/category';
import { CategoriesRepository } from '@/db/repositories/categoriesRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { onMounted, ref } from 'vue';

const categoriesRepo = RepositoryFactory.createInstance(CategoriesRepository);

export default function useAllCategories() {
  const categories = ref<Category[]>([]);

  const getAllCategories = async () => {
    categories.value = await categoriesRepo.getAll();
  }

  onMounted(getAllCategories);

  return {
    categories
  }
}
