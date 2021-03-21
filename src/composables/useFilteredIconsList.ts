import { iconsList } from '@/assets/material-design-iconic-font/icons-list';
import { computed, ref } from 'vue';

export default function useFilteredIconsList() {
  const searchQuery = ref('');

  const iconsMatchingSearchQuery = computed(() => {
    return iconsList.filter(x =>
      x.toLowerCase().includes(searchQuery.value.toLowerCase()))
  });

  return {
    searchQuery,
    iconsMatchingSearchQuery
  }
}
