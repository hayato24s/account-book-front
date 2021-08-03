import { computed } from 'vue';
import { Ports } from '../adapter';
import { BaseMonth } from '../entities/date';

export const useCalendarBaseMonth = ({ store }: Ports) => {
  const baseMonth = computed<BaseMonth>(() => store.getters.calendarBaseMonth);
  const updateBaseMonth = (baseMonth: BaseMonth) => {
    store.commit('setCalendarBaseMonth', baseMonth);
  };

  return { baseMonth, updateBaseMonth };
};
