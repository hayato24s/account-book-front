import { Ports } from '../adapter';
import { Category, RecordType } from '../api/@types';

/**
 * storeのcategoriesをpriorityをもとに並び替える
 */
export const sortCategoryByPriority = (
  { store }: Ports,
  type?: RecordType
): void => {
  const categories: Category[] = [...store.getters.categories];
  const allPriority: Record<RecordType, string[]> =
    store.getters.categoryPriority;
  const priority =
    type == undefined
      ? allPriority['Expense'].concat(allPriority['Income'])
      : allPriority[type];

  const sortedCategories = priority
    .reduce((acc, id) => {
      const index = categories.findIndex((c) => c.id === id);
      if (index === -1) return acc;
      acc.push(categories[index]);
      categories.splice(index, 1);
      return acc;
    }, [] as Category[])
    .concat(categories);

  store.commit('setCategories', sortedCategories);
};
