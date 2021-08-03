import { Ports } from '../adapter';
import { Category } from '../api/@types';

export const getCategoryById = (
  { store }: Ports,
  id: string
): Category | undefined => {
  return (store.getters.categories as Category[]).find((c) => c.id === id);
};
