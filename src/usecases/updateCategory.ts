import { Ports } from '../adapter';
import { Category } from '../api/@types';
import { causeError, NetWorkError } from './error';

export const updateCategory = async (
  { api, store }: Ports,
  id: string,
  data: Omit<Category, 'id' | 'userId'>
): Promise<void> => {
  const {
    status,
    body: category,
    originalResponse,
  } = await api.category
    ._id(id)
    .put({ body: data })
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  if (status !== 200) causeError(originalResponse);
  store.commit('updateCategory', category);
};
