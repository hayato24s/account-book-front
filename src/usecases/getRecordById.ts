import { Ports } from '../adapter';
import { Record } from '../api/@types';

export const getRecordById = (
  { store }: Ports,
  id: string
): Record | undefined => {
  return (store.getters.records as Record[]).find((r) => r.id === id);
};
