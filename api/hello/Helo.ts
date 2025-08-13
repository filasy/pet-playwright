import { test } from '@playwright/test';
import { ApiRoute } from '../ApiRoute';

export class Hello extends ApiRoute {
  public get(params?: { name?: string }) {
    return test.step(`Sending hello request${params?.name ? ` with 'name' param: ${params.name}` : ''}`, async () => {
      return this.apiClient.sendRequest('GET', this.url, { params });
    });
  }
}
