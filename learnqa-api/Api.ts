import test, { APIRequestContext } from '@playwright/test';
import { PlaywrightApiClient } from '../client/PlaywrightApiClient';
import { Hello } from './hello/Hello';
import { ApiClient } from '../client/ApiClient';
import { User } from './user/User';

export class Api {
  private request: APIRequestContext;
  private apiClient: ApiClient;
  public hello: Hello;
  public user: User;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiClient = new PlaywrightApiClient(this.request);
    this.hello = new Hello(this.apiClient, 'hello');
    this.user = new User(this.apiClient, 'user');
  }
  async authenticate(...params: Parameters<typeof this.user.login>) {
    await test.step(`Authenticating with creds: ${params[0]}, ${params[1]}`, async () => {
      const response = await this.user.login(...params);
      await response.statusCode.shouldBe('OK');

      this.apiClient.setExtraHeaders({
        cookie: response.headers['set-cookie'],
        'x-csrf-token': response.headers['x-csrf-token'],
      });
    });
  }
}
