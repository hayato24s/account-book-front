import { computed } from 'vue';
import { Ports } from '../adapter';
import { BaseMonth } from '../entities/date';

export const useGraphBaseMonth = ({ store }: Ports) => {
  const baseMonth = computed(() => store.getters.graphBaseMonth);
  const updateBaseMonth = (baseMonth: BaseMonth) => {
    store.commit('setGraphBaseMonth', baseMonth);
  };

  return { baseMonth, updateBaseMonth };
};
