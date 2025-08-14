import { HttpMetod } from './HTTPmetod';
import { Response } from './Response';

export type RequestOptions = {
  body?: Record<string, unknown>;
  params?: Record<string, string>;
};

export type ApiClient = {
  sendRequest(method: HttpMetod, url: string, options?: RequestOptions): Promise<Response>;
};
