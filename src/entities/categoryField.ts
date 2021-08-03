import { Category, Record, RecordType } from '../api/@types';

type CategoryFieldData = {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
};

export const makeCategoryFieldData = (
  records: Record[],
  categories: Category[],
  type: RecordType
): CategoryFieldData[] => {
  return categories
    .filter((c) => c.type === type)
    .reduce<CategoryFieldData[]>((acc, c) => {
      const amount = records
        .filter((r) => r.category.id === c.id)
        .reduce((amount, r) => amount + r.amount, 0);
      acc.push({
        categoryId: c.id,
        categoryName: c.name,
        categoryColor: c.color,
        amount,
      });
      return acc;
    }, []);
};
