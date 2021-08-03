import { Ports } from '../adapter';
import { Category, RecordType } from '../api/@types';

export const getCategories = (
  { store }: Ports,
  type?: RecordType
): Category[] => {
  const categories: Category[] = store.getters.categories;
  return type ? categories.filter((c) => c.type === type) : categories;
};
