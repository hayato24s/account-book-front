import { Ports } from '../adapter';
import { RecordType } from '../api/@types';

export const updateCategoryPriority = (
  { store }: Ports,
  type: RecordType,
  priority: string[]
): void => {
  localStorage.setItem(
    `category-priority-${type.toLocaleLowerCase()}`,
    JSON.stringify(priority)
  );
  store.commit('setCategoryPriority', { type, priority });
};
