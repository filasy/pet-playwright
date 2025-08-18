import { test as base } from '@playwright/test';
import { Api } from '../api-learnqa/Api';
import { AuthenticatedApi } from '../api-learnqa/AuthenticatedApi';

type MyFixtures = {
  api: Api;
  authApi: AuthenticatedApi;
};

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use) => {
    await use(new Api(request));
  },

  authApi: async ({ request }, use) => {
    const api = new AuthenticatedApi(request);
    await api.authWithRandomUser();
    await use(api);
    await api.user.delete(api.authUser!.userId);
  },
});

export { expect } from '@playwright/test';
