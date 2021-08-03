import { Record, RecordType } from '../api/@types';

export type DisplayedRecord = {
  id: string;
  type: RecordType;
  amount: number;
  category: string;
  memo: string;
};

export const recordToDisplay = (record: Record): DisplayedRecord => ({
  id: record.id,
  type: record.type,
  amount: record.amount,
  category: record.category.name,
  memo: record.memo,
});

export type RecordTypeJa = '支出' | '収入';

export const recordTypeToJa = (type: RecordType): RecordTypeJa => {
  return type === 'Expense' ? '支出' : '収入';
};

export const jaToRecordType = (ja: RecordTypeJa): RecordType => {
  return ja === '支出' ? 'Expense' : 'Income';
};
