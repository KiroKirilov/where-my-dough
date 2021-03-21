import { MonthObj } from '@/common/helpers/dates';
import { SettingsRepository } from '@/db/repositories/settingsRepository';
import { RepositoryFactory } from '@/db/repositoryFactory';
import { Ref, watch } from 'vue';
import { useData } from '../useData';

const settingsRepo = RepositoryFactory.createInstance(SettingsRepository);

export default function useSettingsForMonth(monthObj: Ref<MonthObj>) {
  const { data, loading, getData, error } = useData(() => settingsRepo.getForMonth(monthObj.value.month, monthObj.value.year));

  watch(monthObj, getData, { deep: true });

  return {
    settingsForMonth: data,
    getSettingsForMonth: getData(),
    settingsRepo,
    settingsForMonthError: error,
    loading
  }
}
