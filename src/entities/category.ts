import { Category } from '../api/@types';

export const initialCategoriesInputData: Omit<Category, 'id' | 'userId'>[] = [
  { type: 'Expense', name: '食費', color: '#9bc698' },
  { type: 'Expense', name: 'その他', color: '#76aeff' },
  { type: 'Income', name: '給料', color: '#eebf29' },
  { type: 'Income', name: 'その他', color: '#e8c6ac' },
];
