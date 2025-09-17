import { test } from '@playwright/test';
import { ApiRoute } from '../BaseApiRoute';

export class Hello extends ApiRoute {
  public get(params?: { name?: string }) {
    return test.step(`Отправить hello запрос ${params?.name ? ` с параметром 'name': ${params.name}` : ''}`, async () => {
      return this
        .apiClient
        .sendRequest<{answer: string}>('GET', this.url, { params });
    });
  }
}
