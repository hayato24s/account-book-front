import { Ports } from '../adapter';
import { Record, RecordType } from '../api/@types';
import { BaseMonth } from '../entities/date';

type Option = {
  baseMonth?: BaseMonth;
  categoryId?: string;
  type?: RecordType;
};

/**
 * storeから条件に合う記録を取得する
 */
export const getRecords = (
  { store, dayjs }: Ports,
  option?: Option
): Record[] => {
  let records: Record[] = store.getters.records;

  if (!option) return records;
  const { baseMonth, categoryId, type } = option;

  if (baseMonth) {
    records = records.filter((r) => {
      const date = dayjs(r.date);
      return date.year() === baseMonth.year && date.month() === baseMonth.month;
    });
  }

  if (categoryId) {
    records = records.filter((r) => r.category.id === categoryId);
  }

  if (type) {
    records = records.filter((r) => r.type === type);
  }

  return records;
};
