import { computed } from 'vue';
import { Ports } from '../adapter';

export const useInputCategoryName = ({ store }: Ports) => {
  const inputCategoryName = computed<string | null>(
    () => store.getters.inputCategoryName
  );
  const updateInputCategoryName = (inputCategoryName: string | null) => {
    store.commit('setInputCategoryName', inputCategoryName);
  };

  return {
    inputCategoryName,
    updateInputCategoryName,
  };
};
