import { APIRequestContext, request } from '@playwright/test';
import { ApiClient, RequestOptions, Response, HttpMetod, Duration } from './index';

export class PlaywrightApiClient implements ApiClient {
  private extraHeaders: Record<string, string> | undefined;
  private _apiContext: APIRequestContext | undefined;

  private async apiContext(): Promise<APIRequestContext> {
    if (!this._apiContext) {
      this._apiContext = await request.newContext();
    }
    return this._apiContext;
  }
  async sendRequest<T extends Record<string, unknown> | string>(
    method: HttpMetod,
    url: string,
    options?: RequestOptions,
  ): Promise<Response<T>> {
    const context = await this.apiContext();
    const startTime = Date.now();
    const response = await context[method.toLowerCase() as 'get'](url, {
      data: options?.body,
      params: options?.params,
      headers: this.extraHeaders,
    });
    const executionTime = new Duration(Date.now() - startTime);
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
      duration: executionTime
    });
  }

  setExtraHeaders(headers: Record<string, string>): void {
    this.extraHeaders = headers;
  }
}
