import test from '@playwright/test';
import { ApiRoute } from '../../api-learnqa/BaseApiRoute';

export class Challenger extends ApiRoute {
  public async login() {
    return test.step(`Получить токен`, async () => {
      return await this.apiClient.sendRequest('POST', this.url);
    });
  }
}
