import { test } from '../../fixtures/App';

test('Проверить лейаут категорий', async ({ categotiesPage }) => {
  await categotiesPage.assertContentPageLayoutScrenshot();
});
