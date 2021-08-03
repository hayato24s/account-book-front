import { Ports } from '../adapter';
import { Category } from '../api/@types';

export const setCategoryPriority = ({ store }: Ports): void => {
  const categories: Category[] = store.getters.categories;

  const storedExpensePriority = localStorage.getItem(
    'category-priority-expense'
  );
  const storedIncomePriority = localStorage.getItem('category-priority-income');

  const expensePriority: string[] =
    storedExpensePriority == undefined
      ? categories.filter((c) => c.type === 'Expense').map((c) => c.id)
      : JSON.parse(storedExpensePriority);
  const incomePriority: string[] =
    storedIncomePriority == undefined
      ? categories.filter((c) => c.type === 'Income').map((c) => c.id)
      : JSON.parse(storedIncomePriority);

  store.commit('setCategoryPriority', {
    type: 'Expense',
    priority: expensePriority,
  });
  store.commit('setCategoryPriority', {
    type: 'Income',
    priority: incomePriority,
  });

  if (storedExpensePriority == undefined) {
    localStorage.setItem(
      'category-priority-expense',
      JSON.stringify(expensePriority)
    );
  }
  if (storedIncomePriority == undefined) {
    localStorage.setItem(
      'category-priority-income',
      JSON.stringify(incomePriority)
    );
  }
};
