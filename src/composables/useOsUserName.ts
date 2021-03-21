import { onMounted, ref } from 'vue';
import fullname from 'fullname';
import os from 'os';

export default function useOsUserName(fallback = 'brother') {
  const name = ref('');

  const initName = async () => {
    try {
      const userFullName = await fullname();
      name.value = userFullName || os.userInfo().username || fallback;
    } catch (error) {
      name.value = fallback;
    }
  };

  onMounted(initName);

  return name;
}
