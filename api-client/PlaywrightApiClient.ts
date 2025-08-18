import { APIRequestContext, test } from '@playwright/test';
import { ApiClient, RequestOptions } from './ApiClient';
import { Response } from './Response';
import { HttpMetod } from './HttpMetod';

export class PlaywrightApiClient implements ApiClient {
  private extraHeaders: Record<string, string> | undefined;

  constructor(private request: APIRequestContext) {}
  setExtraHeaders(headers: Record<string, string>): void {
    this.extraHeaders = headers;
  }

  public async sendRequest<T extends Record<string, unknown> | string>(
    method: HttpMetod,
    url: string,
    options?: RequestOptions,
  ): Promise<Response<T>> {
      const response = await this.request[method.toLowerCase() as 'get'](url, {
        data: options?.body,
        params: options?.params,
        headers: this.extraHeaders,
      });

      let responseBody: Record<string, unknown> | string;
      try {
        responseBody = await response.json();
      } catch (ignored) {
        responseBody = await response.text();
      }
      return new Response<T>({
        statusCode: response.status(),
        body: responseBody as T,
        headers: response.headers(),
      });
  }
}
