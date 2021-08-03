import { BarChartData } from './barChart';

const formatMoM = (amount: number) => {
  return (0 <= amount ? '+' : '') + amount.toLocaleString();
};

/**
 * barChartDataをもとに作成
 */
export const makeSavingFieldData = ({
  baseMonths,
  data: amount,
}: BarChartData) => {
  const length = baseMonths.length;
  if (length === 0) return [];
  const startYear = baseMonths[0].year;
  const lastYear = baseMonths[length - 1].year;
  const initValue = [...new Array(lastYear - startYear + 1)].map(() => []);

  return baseMonths
    .reduce((acc, baseMonth, i) => {
      acc[baseMonth.year - startYear].push({
        month: `00${baseMonth.month + 1}月`.slice(-3),
        amount: amount[i],
        mom: formatMoM(amount[i] - (amount[i - 1] ?? 0)),
      });
      return acc;
    }, initValue as { month: string; amount: number; mom: string }[][])
    .map((data, index) => ({
      year: `${startYear + index}年`,
      data: data.sort(() => -1), // sort by month in descending order.
    }))
    .sort(() => -1); // sort by year in descending order.
};
