import { Ports } from '../adapter';
import { RecordType } from '../api/@types';

export const deleteCategoryPriority = (
  { store }: Ports,
  type: RecordType,
  id: string
): void => {
  const priority = [...(store.getters.categoryPriority[type] as string[])];
  const index = priority.findIndex((p) => p === id);
  if (index === -1) return;
  priority.splice(index, 1);
  localStorage.setItem(
    `category-priority-${type.toLocaleLowerCase()}`,
    JSON.stringify(priority)
  );
  store.commit('setCategoryPriority', { type, priority });
};
