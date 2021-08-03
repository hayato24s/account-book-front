import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const createUser = async (
  { api }: Ports,
  id: string,
  password: string
): Promise<void> => {
  const { status, originalResponse } = await api.user.create
    .post({ body: { id, password } })
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  if (status !== 204) causeError(originalResponse);
};
