import { computed } from 'vue';
import { CategoriesRepository } from '@/db/repositories/categoriesRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { useData } from '../useData';

const categoriesRepo = RepositoryFactory.createInstance(CategoriesRepository);

export default function useCategoriesAsOptions() {
  const { data, loading, error } = useData(() => categoriesRepo.getAll());
  const categoryOptions = computed(() => {
    return (data.value || []).map(x => ({
      key: x._id,
      value: x.name,
      icon: x.icon,
      iconColor: x.iconColor
    }))
  });

  return {
    categoryOptions,
    categoryOptionsError: error,
    loading
  }
}
