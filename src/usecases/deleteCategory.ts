import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const deleteCategory = async (
  { api, store }: Ports,
  id: string
): Promise<void> => {
  const { status, originalResponse } = await api.category
    ._id(id)
    .delete()
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  if (status !== 204) causeError(originalResponse);
  store.commit('deleteCategory', id);
  store.commit('deleteRecordsById', id);
};
