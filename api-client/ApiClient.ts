import { HttpMetod } from './HttpMetod';
import { Response } from './Response';

export type RequestOptions = {
  body?: Record<string, unknown> | string;
  params?: Record<string, string>;
};

export type ApiClient = {
  sendRequest<T extends Record<string, unknown> | string>(
    method: HttpMetod,
    url: string,
    options?: RequestOptions,
  ): Promise<Response<T>>;

  setExtraHeaders(headers: Record<string,string>): void;
};
