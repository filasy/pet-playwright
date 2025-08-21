import test from '@playwright/test';
import { ApiRoute } from '../../api-learnqa/BaseApiRoute';
import { ChalengesResponse, ChalengesSchema } from './ChalengesResponse';

export class Challenges extends ApiRoute {
  public async get() {
    return test.step(`Получить список заданий`, async () => {
      const response = await this.apiClient.sendRequest<ChalengesResponse>('GET', this.url);
      response.setSchema(ChalengesSchema);
      return response;
    });
  }
}
