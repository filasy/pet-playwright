import { test } from '../../fixtures/fixtures';

test('Проверка layout', async ({ categotiesPage }) => {
  await categotiesPage.assertContentPageLayoutScrenshot();
});
