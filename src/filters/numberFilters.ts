import { NumberFormat } from '@/common/enums/NumberFormat';

export function formatNumberFilter(value: number, format: NumberFormat = NumberFormat.Income) {
  if (!value) {
    return 0.00
  }

  const fixedNum = Number(Math.round(Number(value + 'e2')) + 'e-2').toFixed(2);

  switch (format) {
    case NumberFormat.Percent:
      return fixedNum + '%';

    case NumberFormat.Income:
      return value <= 0 ? fixedNum : '+' + fixedNum;

    case NumberFormat.None:
      return fixedNum;
  }
}
