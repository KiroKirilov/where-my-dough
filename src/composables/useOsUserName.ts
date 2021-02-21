import { onMounted, ref } from 'vue';
import fullname from 'fullname';
import os from 'os';

export default function useOsUserName() {
  const name = ref('');

  const initName = async () => {
    const userFullName = await fullname();
    name.value = userFullName || os.userInfo().username;
  };

  onMounted(initName);

  return name;
}
