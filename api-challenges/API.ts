import test from '@playwright/test';
import { ApiClient } from '../api-client/ApiClient';
import { PlaywrightApiClient } from '../api-client/PlaywrightApiClient';
import * as api from './index';

export class Api {
  private apiClient: ApiClient = new PlaywrightApiClient();
  public challenger: api.Challenger = new api.Challenger(
    this.apiClient,
    'challenger',
  );
  public challenges: api.Challenges = new api.Challenges(
    this.apiClient,
    'challenges',
  );
  public todo: api.TodoService = new api.TodoService(this.apiClient, 'todos');

  async authenticate() {
    const response = await this.challenger.login();
    await response.statusCode.shouldBe('Created');
    const token = response.headers['x-challenger'];
    await test.step(`Установить токен: ${token}`, async () => {
      this.apiClient.setExtraHeaders({
        'x-challenger': token,
      });
    });
  }
}
