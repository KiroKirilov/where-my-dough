import { CategoriesRepository } from '@/db/repositories/categoriesRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { useData } from '../useData';

const categoriesRepo = RepositoryFactory.createInstance(CategoriesRepository);

export default function useAllCategories() {
  const { data, loading, getData, error } = useData(() => categoriesRepo.getAll());

  return {
    categories: data,
    getAllCategories: getData,
    categoriesRepo,
    categoriesError: error,
    loading
  }
}
