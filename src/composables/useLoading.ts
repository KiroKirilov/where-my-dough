import { sleep } from '@/common/helpers/sleep';
import { ref } from 'vue';

export default function useLoading() {
  const loading = ref(false);

  const startLoading = () => {
    // loading.value = true;
  }

  const stopLoading = async () => {
    // it's too fast otherwise and it looks janky
    // await sleep(700);
    loading.value = false;
  }

  return {
    loading,
    startLoading,
    stopLoading
  }
}
