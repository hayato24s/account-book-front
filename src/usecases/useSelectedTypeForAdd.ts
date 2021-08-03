import { computed } from 'vue';
import { Ports } from '../adapter';
import { RecordType } from '../api/@types';

export const useSelectedTypeForAdd = ({ store }: Ports) => {
  const selectedType = computed<RecordType>(
    () => store.getters.selectedTypeForAdd
  );
  const updateSelectedType = (type: RecordType) => {
    store.commit('setSelectedTypeForAdd', type);
  };

  return { selectedType, updateSelectedType };
};
