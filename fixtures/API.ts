import { test as base } from '@playwright/test';
import { Api } from '../learnqa-api/Api';
import { AuthotizedApi } from './AuthenticatedApi';

type MyFixtures = {
  api: Api;
  authApi: AuthotizedApi;
};

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use) => {
    await use(new Api(request));
  },

  authApi: async ({ request }, use) => {
    const api = new AuthotizedApi(request);
    await api.authWithRandomUser();
    use(api);
    await api.user.delete(api.authUser!.userId);
  },
});

export { expect } from '@playwright/test';
