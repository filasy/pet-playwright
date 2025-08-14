import { APIRequestContext } from '@playwright/test';
import { PlaywrightApiClient } from '../client/PlaywrightApiClient';
import { Hello } from './hello/Helo';

export class Api {
  private apiClient = new PlaywrightApiClient(this.request);
  public hello = new Hello(this.apiClient, '/api/hello');

  constructor(private request: APIRequestContext) {}
}
