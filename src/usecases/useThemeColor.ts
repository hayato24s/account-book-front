import { computed } from 'vue';
import { Ports } from '../adapter';
import { defaultThemeColors } from '../entities/themeColor';

export const useThemeColor = ({ store }: Ports, init = false) => {
  if (init) {
    const storedThemeColor = localStorage.getItem('theme-color');
    if (storedThemeColor) {
      store.commit('setThemeColor', storedThemeColor);
    } else {
      localStorage.setItem('theme-color', store.getters.themeColor as string);
    }
  }

  const themeColor = computed<string>(() => store.getters.themeColor);
  const updateThemeColor = (color: string) => {
    localStorage.setItem('theme-color', color);
    store.commit('setThemeColor', color);
  };
  const customed = computed(() => {
    const defaultThemeColorSet = new Set(defaultThemeColors.map((c) => c.code));
    return !defaultThemeColorSet.has(themeColor.value);
  });

  return {
    themeColor,
    updateThemeColor,
    customed,
  };
};
