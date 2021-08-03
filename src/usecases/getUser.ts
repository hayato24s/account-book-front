import { Ports } from '../adapter';
import { User } from '../api/@types';

export const getUser = ({ store }: Ports) => {
  return store.getters.user as User | null;
};
