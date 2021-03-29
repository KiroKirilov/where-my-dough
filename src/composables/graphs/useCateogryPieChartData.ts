import { groupBy } from '@/common/helpers/grouping';
import { Transaction } from '@/db/models/transaction';
import { computed, Ref } from 'vue';
import { formatNumberFilter } from '@/filters/numberFilters';
import { NumberFormat } from '@/common/enums/NumberFormat';

class CategoryInfo {
  name!: string;
  icon?: string;
  iconColor?: string;
  id?: string;
}

const noCategoryLabel = 'No category';
const categoryInfoSeparator = '|||';

const parseCategoryString: (categoryString: string) => CategoryInfo = (categoryString: string) => {
  if (categoryString === noCategoryLabel || !categoryString) {
    return {
      name: categoryString
    };
  }

  const parts = categoryString.split(categoryInfoSeparator);

  return {
    name: parts[0],
    icon: parts[1],
    iconColor: parts[2],
    id: parts[3]
  }
}

export function useCateogryPieChartData(transactions?: Ref<Transaction[] | undefined> | undefined, tooltipClass?: string) {
  const sumAmounts = (transactions?: Transaction[]) => {
    return (transactions || []).reduce((prev, curr) => prev + curr.amount, 0);
  }

  const expensesByCategory = computed(() => {
    return groupBy(
      (transactions?.value || []),
      (x) => x.category
        ? `${x.category.name}${categoryInfoSeparator}${x.category.icon}${categoryInfoSeparator}${x.category.iconColor}${categoryInfoSeparator}${x.categoryId}`
        : noCategoryLabel
    )
      .filter(x => sumAmounts(x.items) < 0);
  });

  const getTotalForCategory = (categoryString: string) => {
    return sumAmounts(expensesByCategory.value
      .find(x => x.key === categoryString)
      ?.items)
  }

  const getCountForCategory = (categoryString: string) => {
    return expensesByCategory.value
      .find(x => x.key === categoryString)?.items?.length || 0
  }

  const tooltipBuilder = ({ w, seriesIndex, series }: any) => {
    const expensesForCategory = series[seriesIndex];
    const categoryString = w.config.categoryStrings[seriesIndex]
    const categoryInfo = parseCategoryString(categoryString);

    return (
      `
<div class="${tooltipClass}">
  <i class="zmdi zmdi-${categoryInfo.icon}" style="color: ${categoryInfo.iconColor};font-family: Material-Design-Iconic-Font;"></i>
  <b>${categoryInfo.name}: ${formatNumberFilter(-expensesForCategory, NumberFormat.Income)} (${getCountForCategory(categoryString)} transacions)</b>
</div>
`);
  }

  const categoryPieChartOptions = computed(() => {
    return {
      labels: expensesByCategory.value.map((x) => parseCategoryString(x.key).name),
      theme: {
        mode: 'dark',
        palette: 'palette1'
      },
      tooltip: {
        custom: tooltipBuilder
      },
      categoryStrings: expensesByCategory.value.map((x) => x.key),
      title: {
        text: 'Expenses per category'
      },
      noData: {
        text: 'No data available'
      }
    }
  });

  const categoryPieChartSeries = computed(() => {
    return expensesByCategory.value.map((x) => Math.abs(getTotalForCategory(x.key) || 0));
  });

  return {
    categoryPieChartOptions,
    categoryPieChartSeries
  }
}
