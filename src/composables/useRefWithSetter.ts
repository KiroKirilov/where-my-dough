import { ref, UnwrapRef, Ref } from 'vue'

export default function useRefWithSetter<T>(val: T): [Ref<UnwrapRef<T>>, (newVal: UnwrapRef<T>) => void] {
  const refVar = ref<T>(val);

  const setRefVar = (newVal: UnwrapRef<T>) => {
    refVar.value = newVal;
  }
  return [
    refVar,
    setRefVar
  ];
}
