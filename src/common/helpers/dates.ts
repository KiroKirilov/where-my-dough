export interface MonthObj {
  month: number;
  year: number;
}

export function getMonthMaxAndMin(month: number, year: number) {
  const maxValue = new Date(year, month, 0, 23, 59, 59, 999).getTime();
  const minValue = new Date(year, month - 1, 1, 0, 0, 0, 0).getTime();

  return {
    maxValue,
    minValue
  }
}
