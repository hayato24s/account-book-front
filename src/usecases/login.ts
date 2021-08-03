import { Ports } from '../adapter';
import { NetWorkError } from './error';

export const login = async (
  { api }: Ports,
  id: string,
  password: string
): Promise<boolean> => {
  const { status } = await api.auth.login
    .post({ body: { id, password } })
    .catch((error) => {
      console.error(error);
      throw new NetWorkError();
    });
  return status === 204;
};
