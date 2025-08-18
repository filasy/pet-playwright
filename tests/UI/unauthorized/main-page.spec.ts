import { test } from '../../../fixtures/App';

test.beforeEach(async ({ app }) => {
  await app.mainPage.visit();
  await app.mainPage.closeCoockeisAlert();
  await app.mainPage.closeAdvertisementModal();
});

test.describe(
  'Доступность элементов',
  {
    annotation: {
      type: 'Автор',
      description: 'Yuliya Pirogova',
    },
  },
  () => {
    test('Проверить боковое меню для неавторизованного пользователя', async ({ app }) => {
      await app.mainPage.assertMenuAriaSnapshot();
    });
    test('Проверить хедер для неавторизованного пользователя', async ({ app }) => {
      await app.mainPage.header.assertHeaderAriaSnapshot();
    });
    test('Проверить табы категорий для неавторизованного пользователя', async ({ app }) => {
      await app.mainPage.assertCategoriesTabsAriaSnapshot();
    });
    test('Проверить список добавления контента для неавторизованного пользователя', async ({
      app,
    }) => {
      await app.mainPage.header.openAddPopupList();
      await app.mainPage.assertAddPopupListAriaSnapshot();
    });
    test('Проверить попап уведомлений для неавторизованного пользователя', async ({ app }) => {
      await app.mainPage.header.openNotificationdPopupList();
      await app.mainPage.assertNotificationPopupListAriaSnapshot();
    });
    test('Проверить модальное окно авторизации для неавторизованного пользователя', async ({
      app,
    }) => {
      await app.mainPage.header.openAuthorisationModal();
      await app.mainPage.assertAuthorizationModalAriaSnapshot();
    });
    test('Проверить развернутое меню для неавторизованного пользователя', async ({ app }) => {
      await app.mainPage.header.openFullMenu();
      await app.mainPage.assertFullMenuAriaSnapshot();
    });
  },
);

test('Переключить тему с темной на светлую', async ({ app }) => {
  await app.mainPage.assertTheme('dark2021');
  await app.mainPage.header.changeThemeToWhite();
  await app.mainPage.assertTheme('white2022');
});
