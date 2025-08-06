import { test } from '../../fixtures/fixtures';

test('Проверить layout', async ({ categotiesPage }) => {
  await categotiesPage.assertContentPageLayoutScrenshot();
});
