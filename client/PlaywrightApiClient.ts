import { APIRequestContext, test } from '@playwright/test';
import { ApiClient, HttpMetod, RequestOptions } from './ApiClient';
import { Response } from './Response';

export class PlaywrightApiClient implements ApiClient {
  constructor(private request: APIRequestContext) {}
  public sendRequest(method: HttpMetod, url: string, options?: RequestOptions): Promise<Response> {
    return test.step(`Sending ${method} request to url ${url}`, async () => {
      const response = await this.request[method.toLowerCase() as 'get'](url, {
        data: options?.body,
        params: options?.params,
      });

      let responseBody: Record<string, unknown> | string;
      try {
        responseBody = await response.json();
      } catch (ignored) {
        responseBody = await response.text();
      }
      return new Response({
        statusCode: response.status(),
        body: responseBody,
        headers: response.headers(),
      });
    });
  }
}
