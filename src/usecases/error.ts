import { extend } from 'dayjs';

class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
    // Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class Unauthorized extends BaseError {
  constructor() {
    super('未認証です');
  }
}

export class NetWorkError extends BaseError {
  constructor() {
    super('ネットワークエラー');
  }
}

type OriginalResponse = {
  data: {
    message: string;
    error: any[];
  };
  status: number;
  statusText: string;
};

export class NetWorkAccessError extends BaseError {
  status: number;

  constructor(originalResponse: OriginalResponse) {
    super(originalResponse.data.message);
    this.status = originalResponse.status;
  }
}

export const causeError = (originalResponse: OriginalResponse) => {
  const { status } = originalResponse;

  if (status === 401) {
    throw new Unauthorized();
  } else {
    throw new NetWorkAccessError(originalResponse);
  }
};
