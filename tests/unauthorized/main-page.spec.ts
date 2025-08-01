import { test } from '../../fixtures/App';

test.describe(
  'main-page',
  {
    tag: '@smoke',
    annotation: {
      type: 'Автор',
      description: 'Yuliya Pirogova',
    },
  },
  () => {
    test('Открытие главной страницы', async ({ app }) => {
      await app.mainPage.visit();
    });
  },
);
