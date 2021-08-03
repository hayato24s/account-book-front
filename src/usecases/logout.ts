import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const logout = async ({ api, store }: Ports): Promise<void> => {
  const { status, originalResponse } = await api.auth.logout
    .get()
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  if (status !== 204) causeError(originalResponse);
  store.commit('setUser', null);
};
