import { test } from '../fixtures/App';

test('Authentication', async ({ app }) => {
  await app.mainPage.visit();
  await app.mainPage.closeAdvertisementModal();
  await app.mainPage.login();
});
