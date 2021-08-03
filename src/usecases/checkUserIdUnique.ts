import { Ports } from '../adapter';
import { causeError, NetWorkError } from './error';

export const checkUserIdUnique = async (
  { api }: Ports,
  id: string
): Promise<boolean> => {
  const {
    status,
    body: { unique },
    originalResponse,
  } = await api.user.unique.get({ query: { id } }).catch((error) => {
    console.log(error);
    throw new NetWorkError();
  });
  if (status !== 200) causeError(originalResponse);
  return unique;
};
