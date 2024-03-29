import { customRef } from 'vue'

export default function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: NodeJS.Timeout;
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
