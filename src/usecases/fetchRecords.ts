import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const fetchRecords = async ({ api, store }: Ports): Promise<void> => {
  const {
    status,
    body: records,
    originalResponse,
  } = await api.record.get().catch((error) => {
    console.error(error);
    throw new NetWorkError();
  });
  if (status !== 200) causeError(originalResponse);
  store.commit('setRecords', records);
};
