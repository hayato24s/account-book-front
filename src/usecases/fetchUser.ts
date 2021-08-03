import { Ports } from '../adapter';
import {
  causeError,
  NetWorkAccessError,
  NetWorkError,
  Unauthorized,
} from './error';

export const fetchUser = async ({ api, store }: Ports): Promise<void> => {
  const {
    status,
    body: user,
    originalResponse,
  } = await api.user.me.get().catch((error) => {
    console.log(error);
    throw new NetWorkError();
  });
  if (status !== 200) causeError(originalResponse);
  store.commit('setUser', user);
};
