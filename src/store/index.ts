import dayjs from 'dayjs';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { Category, Record as ApiRecord, RecordType, User } from '../api/@types';
import { BaseMonth } from '../entities/date';
import { getters } from './getters';
import { mutations } from './mutations';

export type GlobalState = {
  user: User | null;
  records: ApiRecord[];
  categories: Category[];
  categoryPriority: Record<RecordType, string[]>;
  themeColor: string;
  calendarBaseMonth: BaseMonth;
  graphBaseMonth: BaseMonth;
  selectedTypeForAdd: RecordType;
  selectedTypeForGraph: RecordType | 'Saving';
  selectedColor: string | null;
  inputCategoryName: string | null;
};

const now = dayjs().locale('ja');

const initState: GlobalState = {
  user: null,
  records: [],
  categories: [],
  categoryPriority: { Expense: [], Income: [] },
  themeColor: '#1b3367',
  calendarBaseMonth: {
    year: now.year(),
    month: now.month(),
  },
  graphBaseMonth: {
    year: now.year(),
    month: now.month(),
  },
  selectedTypeForAdd: 'Expense',
  selectedTypeForGraph: 'Expense',
  selectedColor: null,
  inputCategoryName: null,
};

export const store = createStore<GlobalState>({
  state: initState,
  getters,
  mutations,
  strict: true,
});

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

export const useStore = () => {
  return baseUseStore(StateKey);
};
