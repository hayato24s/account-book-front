import { Ports } from '../adapter';
import { Record } from '../api/@types';
import { causeError, NetWorkError } from './error';

export const updateRecord = async (
  { api, store }: Ports,
  id: string,
  data: Omit<Record, 'id' | 'userId'>
): Promise<void> => {
  const {
    status,
    body: record,
    originalResponse,
  } = await api.record
    ._id(id)
    .put({ body: data })
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  if (status !== 200) causeError(originalResponse);
  store.commit('updateRecord', record);
};
