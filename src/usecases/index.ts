import axios from 'axios';
import aspidaClient from '@aspida/axios';
import apiInstance, { ApiInstance } from '../api/$api';
import dayjs, { ConfigType, Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import { Ports } from '../adapter';
import { useStore } from '../store';
import { fetchUser } from './fetchUser';
import { fetchRecords } from './fetchRecords';
import { fetchCategories } from './fetchCategories';
import { setCategoryPriority } from './setCategoryPriority';
import { sortCategoryByPriority } from './sortCategoryByPriority';
import { useThemeColor } from './useThemeColor';

export const useDayjs = (date?: ConfigType): Dayjs => dayjs(date).locale('ja');

export const usePorts = (): Ports => ({
  api: apiInstance(
    aspidaClient(axios, {
      withCredentials: true,
      validateStatus: () => true,
    })
  ) as ApiInstance,
  store: useStore(),
  dayjs: useDayjs,
});

export const initialRunUsecases = async (ports: Ports) => {
  await fetchUser(ports);
  await fetchRecords(ports);
  await fetchCategories(ports);
  setCategoryPriority(ports);
  sortCategoryByPriority(ports);
  useThemeColor(ports, true);
};
