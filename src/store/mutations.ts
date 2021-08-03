import { MutationTree } from 'vuex';
import { GlobalState } from '.';
import { Category, Record as ApiRecord, RecordType, User } from '../api/@types';
import { BaseMonth } from '../entities/date';

export const mutations: MutationTree<GlobalState> = {
  setThemeColor(state, color) {
    state.themeColor = color;
  },
  setUser(state, user: User | null) {
    state.user = user;
  },
  setRecords(state, records: ApiRecord[]) {
    state.records = records;
  },
  addRecord(state, record: ApiRecord) {
    state.records.push(record);
  },
  updateRecord(state, record: ApiRecord) {
    const index = state.records.findIndex((r) => r.id === record.id);
    if (index === -1) throw new Error("can't find record matched given id.");
    state.records[index] = record;
  },
  deleteRecord(state, id: string) {
    const index = state.records.findIndex((r) => r.id === id);
    if (index === -1) return;
    state.records.splice(index, 1);
  },
  deleteRecordsById(state, id: string) {
    state.records = state.records.filter((r) => r.category.id !== id);
  },
  setCategories(state, categories: Category[]) {
    state.categories = categories;
  },
  addCategory(state, category: Category) {
    state.categories.push(category);
  },
  updateCategory(state, category: Category) {
    const index = state.categories.findIndex((c) => c.id === category.id);
    if (index === -1) throw new Error("can't find category matched given id.");
    state.categories[index] = category;
  },
  deleteCategory(state, id: string) {
    const index = state.categories.findIndex((c) => c.id === id);
    if (index === -1) return;
    state.categories.splice(index, 1);
  },
  setCategoryPriority(
    state,
    { type, priority }: { type: RecordType; priority: string[] }
  ) {
    state.categoryPriority[type] = priority;
  },
  setCalendarBaseMonth(state, baseMonth: BaseMonth) {
    state.calendarBaseMonth = baseMonth;
  },
  setGraphBaseMonth(state, baseMonth: BaseMonth) {
    state.graphBaseMonth = baseMonth;
  },
  setSelectedTypeForAdd(state, type: RecordType) {
    state.selectedTypeForAdd = type;
  },
  setSelectedTypeForGraph(state, type: RecordType | 'Saving') {
    state.selectedTypeForGraph = type;
  },
  setSelectedColor(state, selectedColor: string | null) {
    state.selectedColor = selectedColor;
  },
  setInputCategoryName(state, inputCategoryName: string | null) {
    state.inputCategoryName = inputCategoryName;
  },
};
