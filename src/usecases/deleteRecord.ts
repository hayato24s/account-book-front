import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const deleteRecord = async (
  { api, store }: Ports,
  id: string
): Promise<void> => {
  const { status, originalResponse } = await api.record
    ._id(id)
    .delete()
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  if (status !== 204) causeError(originalResponse);
  store.commit('deleteRecord', id);
};
