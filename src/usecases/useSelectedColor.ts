import { computed } from 'vue';
import { Ports } from '../adapter';
import { DefaultColor, defaultColors } from '../entities/colorBox';

export const useSelectedColor = ({ store }: Ports) => {
  const selectedColor = computed<string | null>(
    () => store.getters.selectedColor
  );
  const updateSelectedColor = (selectedColor: string | null) => {
    store.commit('setSelectedColor', selectedColor);
  };
  const customed = computed(() => {
    if (!selectedColor.value) return false;
    return !new Set(defaultColors).has(selectedColor.value as DefaultColor);
  });

  return {
    selectedColor,
    updateSelectedColor,
    customed,
  };
};
