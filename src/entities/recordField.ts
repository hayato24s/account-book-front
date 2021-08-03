import { Dayjs } from 'dayjs';
import { Record } from '../api/@types';
import { useDayjs } from '../usecases';
import { DisplayedRecord, recordToDisplay } from './record';

export const makeRecordFieldData = (records: Record[]) => {
  const thisYear = useDayjs().year();
  return records
    .reduce((acc, record) => {
      const date = useDayjs(record.date);
      const index = acc.findIndex((obj) => date.isSame(obj.date, 'date'));
      if (index === -1) {
        acc.push({
          date,
          length: 1,
          displayedDate:
            date.year() === thisYear
              ? date.format('MM月DD日')
              : date.format('YYYY年MM月DD日'),
          records: [recordToDisplay(record)],
        });
      } else {
        acc[index].records.push(recordToDisplay(record));
        acc[index].length++;
      }
      return acc;
    }, [] as { date: Dayjs; displayedDate: string; length: number; records: DisplayedRecord[] }[])
    .sort((a, b) => b.date.date() - a.date.date());
};
