export type BaseMonth = {
  year: number;
  month: number; // 0 ~ 11
};

/**
 * 'YYYY': year=2020 -> 2020,
 * 'MM': month: 1 -> 02
 * 'M': month 1 -> 2
 */
export const formatBaseMonth = (str: string, baseMonth: BaseMonth): string => {
  return str
    .replace('YYYY', `0000${baseMonth.year}`.slice(-4))
    .replace('MM', `00${baseMonth.month + 1}`.slice(-2))
    .replace('M', String(baseMonth.month + 1));
};

export const addMonth = (baseMonth: BaseMonth, n: number): BaseMonth => ({
  year: baseMonth.year + Math.floor((baseMonth.month + n) / 12),
  month: (((baseMonth.month + n) % 12) + 12) % 12,
});

/**
 * compare baseMonth
 * a < b -> return -1
 * a = b -> return 0
 * a > b -> return 1
 */
export const compareBaseMonth = (a: BaseMonth, b: BaseMonth): number => {
  if (a.year === b.year && a.month === b.month) return 0;
  return a.year < b.year ? -1 : a.year === b.year && a.month < b.month ? -1 : 1;
};
