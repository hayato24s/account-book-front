import { computed } from 'vue';
import { Ports } from '../adapter';
import { RecordType } from '../api/@types';

export const useSelectedTypeForGraph = ({ store }: Ports) => {
  const selectedType = computed<RecordType | 'Saving'>(
    () => store.getters.selectedTypeForGraph
  );
  const updateSelectedType = (type: RecordType | 'Saving') => {
    store.commit('setSelectedTypeForGraph', type);
  };

  return { selectedType, updateSelectedType };
};
