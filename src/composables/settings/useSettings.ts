import { SettingsRepository } from '@/db/repositories/settingsRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { useData } from '../useData';

const settingsRepo = RepositoryFactory.createInstance(SettingsRepository);

export default function useSettings() {
  const { data, loading, getData, error } = useData(() => settingsRepo.getLatest());

  return {
    settings: data,
    getSettings: getData,
    settingsRepo,
    settingsError: error,
    loading
  }
}
