import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const fetchCategories = async ({ api, store }: Ports): Promise<void> => {
  const {
    status,
    body: categories,
    originalResponse,
  } = await api.category.get().catch((error) => {
    console.error(error);
    throw new NetWorkError();
  });
  if (status !== 200) causeError(originalResponse);
  store.commit('setCategories', categories);
};
