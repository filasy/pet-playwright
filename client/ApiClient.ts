import { Response } from './Response';
export type HttpMetod = 'GET' | 'POST' | 'PUT' | 'PUTCH' | 'DELETE';

export type RequestOptions = {
  body?: Record<string, unknown>;
  params?: Record<string, string>;
};

export type ApiClient = {
  sendRequest(method: HttpMetod, url: string, options?: RequestOptions): Promise<Response>;
};
