import { Category } from '../api/@types';

export type DefaultColor =
  | '#9bc698'
  | '#eebf29'
  | '#76aeff'
  | '#ff6099'
  | '#373344'
  | '#c69827'
  | '#C33030'
  | '#9EB46E'
  | '#5E71AF'
  | '#3C854A'
  | '#8389D7'
  | '#762F87'
  | '#3B3939'
  | '#F49260'
  | '#e8c6ac'
  | '#B1AEAE';

export const defaultColors: DefaultColor[] = [
  '#9bc698',
  '#eebf29',
  '#76aeff',
  '#ff6099',
  '#373344',
  '#c69827',
  '#C33030',
  '#9EB46E',
  '#5E71AF',
  '#3C854A',
  '#8389D7',
  '#762F87',
  '#3B3939',
  '#F49260',
  '#e8c6ac',
  '#B1AEAE',
];

export const makeColorBoxData = (
  categories: Category[]
): { color: string; used: boolean }[] => {
  const usedColorSet = new Set(categories.map((c) => c.color));
  return defaultColors.map<{ color: DefaultColor; used: boolean }>((color) => ({
    color,
    used: usedColorSet.has(color),
  }));
};

export const getInitDefaultColor = (categories: Category[]): DefaultColor => {
  const usedColorSet = new Set(...categories.map((c) => c.color));
  const unUsedColors: DefaultColor[] = defaultColors.filter(
    (color) => !usedColorSet.has(color)
  );
  return unUsedColors.length === 0
    ? defaultColors[Math.floor(Math.random() * defaultColors.length)]
    : unUsedColors[Math.floor(Math.random() * unUsedColors.length)];
};
