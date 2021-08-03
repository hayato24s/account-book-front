import { GetterTree } from 'vuex';
import { GlobalState } from '.';

export const getters: GetterTree<GlobalState, GlobalState> = {
  user: (state) => {
    return state.user;
  },
  themeColor: (state) => {
    return state.themeColor;
  },
  records: (state) => {
    return state.records;
  },
  categories: (state) => {
    return state.categories;
  },
  categoryPriority: (state) => {
    return state.categoryPriority;
  },
  calendarBaseMonth: (state) => {
    return state.calendarBaseMonth;
  },
  graphBaseMonth: (state) => {
    return state.graphBaseMonth;
  },
  selectedTypeForAdd: (state) => {
    return state.selectedTypeForAdd;
  },
  selectedTypeForGraph: (state) => {
    return state.selectedTypeForGraph;
  },
  selectedColor: (state) => {
    return state.selectedColor;
  },
  inputCategoryName: (state) => {
    return state.inputCategoryName;
  },
};
