import { ConfigType, Dayjs } from 'dayjs';
import { Store } from 'vuex';
import { ApiInstance } from '../api/$api';
import { GlobalState } from '../store';

export type Ports = {
  api: ApiInstance;
  store: Store<GlobalState>;
  dayjs: (date?: ConfigType) => Dayjs;
};
