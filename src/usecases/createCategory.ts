import { Ports } from '../adapter';
import { Category } from '../api/@types';
import { causeError, NetWorkError } from './error';

export const createCategory = async (
  { api, store }: Ports,
  data: Omit<Category, 'id' | 'userId'>
): Promise<Category> => {
  const {
    status,
    body: category,
    originalResponse,
  } = await api.category.post({ body: data }).catch((error) => {
    console.error(error);
    throw new NetWorkError();
  });
  if (status !== 200) causeError(originalResponse);
  store.commit('addCategory', category);
  return category;
};
