import { computed, onMounted, ref } from 'vue';
import useLoading from './useLoading';

export function useData<T>(getDataFunc: () => Promise<T | undefined>) {
  const data = ref<T>();
  const error = ref<any>();
  const hasError = computed(() => !!error.value);
  const { loading, startLoading, stopLoading } = useLoading();

  const getData = async () => {
    try {
      startLoading();
      data.value = await getDataFunc();
      stopLoading();
      error.value = undefined;
    } catch (er) {
      console.error(er);
      error.value = er;
      stopLoading();
    }
  }

  onMounted(getData);

  return {
    data,
    getData,
    error,
    hasError,
    loading
  }
}
