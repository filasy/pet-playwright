import test from '@playwright/test';
import { PlaywrightApiClient } from '../api-client/PlaywrightApiClient';
import { Hello } from './hello/Hello';
import { ApiClient } from '../api-client/ApiClient';
import { User } from './user/User';

export class Api {
  private apiClient: ApiClient = new PlaywrightApiClient();
  public hello: Hello = new Hello(this.apiClient, 'hello');
  public user: User = new User(this.apiClient, 'user');

  async authenticate(...params: Parameters<typeof this.user.login>) {
    await test.step(`Логин с учетными данными: ${params[0]}, ${params[1]}`, async () => {
      const response = await this.user.login(...params);
      await response.statusCode.shouldBe('OK');

      this.apiClient.setExtraHeaders({
        cookie: response.headers['set-cookie'],
        'x-csrf-token': response.headers['x-csrf-token'],
      });
    });
  }
}
