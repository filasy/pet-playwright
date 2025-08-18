import { test as base } from '@playwright/test';
import { Api } from '../api-learnqa/Api';
import { AuthenticatedApi } from '../api-learnqa/AuthenticatedApi';

type MyFixtures = {
  api: Api;
  authApi: AuthenticatedApi;
};

export const test = base.extend<MyFixtures>({
  api: async ({}, use) => {
    await use(new Api());
  },

  authApi: async ({}, use) => {
    const api = new AuthenticatedApi();
    await api.authWithRandomUser();
    await use(api);
    await api.user.delete(api.authUser!.userId);
  },
});

export { expect } from '@playwright/test';
