import { Ports } from '../adapter';
import { Record } from '../api/@types';
import { causeError, NetWorkError } from './error';

export const createRecord = async (
  { api, store }: Ports,
  data: Omit<Record, 'id' | 'userId'>
): Promise<Record> => {
  const {
    status,
    body: record,
    originalResponse,
  } = await api.record.post({ body: data }).catch((error) => {
    console.error(error);
    throw new NetWorkError();
  });
  if (status !== 200) causeError(originalResponse);
  store.commit('addRecord', record);
  return record;
};
