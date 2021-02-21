
import { sleep } from '@/common/helpers/sleep';
import { Settings } from '@/db/models/settings';
import { SettingsRepository } from '@/db/repositories/settingsRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { onMounted, ref } from 'vue';

const settingsRepo = RepositoryFactory.createInstance(SettingsRepository);

export default function useAllCategories() {
  const settings = ref<Settings>();
  const settingsError = ref(false);
  const loading = ref(false);

  const stopLoading = async() => {
    // it's too fast otherwise and it looks janky
    await sleep(700);
    loading.value = false;
  }

  const getSettings = async () => {
    try {
      loading.value = true;
      settings.value = await settingsRepo.getSingle();
      console.log(settings.value);
      stopLoading();
    } catch (error) {
      console.error(error);
      settingsError.value = true;
      stopLoading();
    }
  }

  onMounted(getSettings);

  return {
    settings,
    getSettings,
    settingsRepo,
    settingsError,
    loading
  }
}
