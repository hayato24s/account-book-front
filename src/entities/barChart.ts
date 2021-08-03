import { Record as ApiRecord } from '../api/@types';
import { BaseMonth, formatBaseMonth } from '../entities/date';
import { useDayjs } from '../usecases';

export type BarChartData = {
  baseMonths: BaseMonth[];
  labels: string[];
  data: number[];
};

export const makeBarChartData = (
  records: ApiRecord[],
  mom = false
): BarChartData => {
  const now = useDayjs();
  const maxYear = now.year();
  const minYear = records.reduce<number>((minYear, r) => {
    const year = Number(r.date.slice(0, 4));
    return year < minYear ? year : minYear;
  }, maxYear);

  const years: string[] = [...Array(maxYear - minYear + 1)].map((_, i) =>
    String(minYear + i)
  );

  const initData = years.reduce((acc, year) => {
    acc[year] = Array(12).fill(0);
    return acc;
  }, {} as Record<string, Array<number>>);

  const data = records.reduce((_, r) => {
    const year = r.date.slice(0, 4);
    const month = Number(r.date.slice(5, 7));
    initData[year][month - 1] +=
      mom && r.type === 'Expense' ? -r.amount : r.amount;
    return initData;
  }, initData);

  let flg = false;
  let totalAmount = 0;
  return years.reduce(
    (acc, year) => {
      data[year].forEach((amount, i) => {
        flg ||= Boolean(amount);
        if (Number(year) === maxYear && i > now.month()) return acc;
        else if (!flg && Number(year) === minYear && minYear !== maxYear)
          return acc;
        acc.baseMonths.push({ year: Number(year), month: i });
        acc.labels.push(
          formatBaseMonth(i === 0 ? 'YYYY年MM月' : 'MM月', {
            year: Number(year),
            month: i,
          })
        );
        totalAmount += amount;
        acc.data.push(mom ? totalAmount : amount);
      });
      return acc;
    },
    { baseMonths: [], labels: [], data: [] } as BarChartData
  );
};
