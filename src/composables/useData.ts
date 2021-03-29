import { computed, onMounted, ref } from 'vue';
import useLoading from './useLoading';

export function useData<T>(getDataFunc: () => Promise<T | undefined>, loadingEnabled = false) {
  const data = ref<T>();
  const error = ref<any>();
  const hasError = computed(() => !!error.value);
  const { loading, startLoading, stopLoading } = useLoading();

  const getData = async () => {
    try {
      if (loadingEnabled) {
        startLoading();
      }
      data.value = await getDataFunc();
      if (loadingEnabled) {
        stopLoading();
      }
      error.value = undefined;
    } catch (er) {
      console.error(er);
      error.value = er;
      if (loadingEnabled) {
        stopLoading();
      }
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
