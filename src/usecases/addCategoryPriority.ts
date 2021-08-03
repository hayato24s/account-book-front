import { Ports } from '../adapter';
import { RecordType } from '../api/@types';

export const addCategoryPriority = (
  { store }: Ports,
  type: RecordType,
  id: string
): void => {
  const priority = [...store.getters.categoryPriority[type]] as string[];
  priority.push(id);
  localStorage.setItem(
    `category-priority-${type.toLocaleLowerCase()}`,
    JSON.stringify(priority)
  );
  store.commit('setCategoryPriority', { type, priority });
};
