import { test } from '../../fixtures/fixtures';

test('Проверить лейаут категорий', async ({ categotiesPage }) => {
  await categotiesPage.assertContentPageLayoutScrenshot();
});
