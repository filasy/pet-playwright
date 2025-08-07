import { test } from '../../fixtures/App';

test('Проверить доступность контента для авторизованного пользователя', async ({ app }) => {
  await app.subscriptionsPage.visit();
  await app.subscriptionsPage.assertContentPageAriaSnapshot();
});
