import { test } from '../../../fixtures/App';

test('Проверить доступность контента для неавторизованного пользователя', async ({ app }) => {
  await app.subscriptionsPage.visit();
  await app.subscriptionsPage.closeCoockeisAlert();
  await app.subscriptionsPage.closeAdvertisementModal();
  await app.subscriptionsPage.assertContentPageAriaSnapshot();
});
