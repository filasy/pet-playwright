import { test as base } from '@playwright/test';
import { Api as Learnqa } from '../api-learnqa/Api';
import { Api as Apichallenges } from '../api-challenges/API';
import { AuthenticatedApi } from '../api-learnqa/AuthenticatedApi';

type MyFixtures = {
  api: Learnqa;
  authApi: AuthenticatedApi;
  challenges: Apichallenges;
};

export const test = base.extend<MyFixtures>({
  api: async ({}, use) => {
    await use(new Learnqa());
  },

  authApi: async ({}, use) => {
    const api = new AuthenticatedApi();
    await api.authWithRandomUser();
    await use(api);
    await api.user.delete(api.authUser!.userId);
  },

  challenges: async ({}, use) => {
    await use(new Apichallenges());
  },
});

export { expect } from '@playwright/test';
