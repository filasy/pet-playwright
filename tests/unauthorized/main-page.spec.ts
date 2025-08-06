import { test } from '../../fixtures/App';

test.beforeEach(async ({ app }) => {
  await app.mainPage.visit();
  await app.mainPage.closeCoockeisAlert();
  await app.mainPage.closeAdvertisementModal();
});

test.describe(
  'Доступность элементов',
  {
    tag: '@smoke',
    annotation: {
      type: 'Автор',
      description: 'Yuliya Pirogova',
    },
  },
  () => {
    test('Проверить доступность элементов бокового меню', async ({ app }) => {
      await app.mainPage.assertMenuAriaSnapshot();
    });
    test('Проверить доступность элементов хедера', async ({ app }) => {
      await app.mainPage.assertHeaderAriaSnapshot();
    });
    test('Проверить доступность элементов табов категорий', async ({ app }) => {
      await app.mainPage.assertCategoriesTabsAriaSnapshot();
    });
    test('Проверить доступность элементов списка добавления контента', async ({ app }) => {
      await app.mainPage.openAddPopupList();
      await app.mainPage.assertAddPopupListAriaSnapshot();
    });
    test('Проверить доступность элементов попапа уведомлений', async ({ app }) => {
      await app.mainPage.openNotificationdPopupList();
      await app.mainPage.assertNotificationPopupListAriaSnapshot();
    });
    test('Проверить доступность элементов модального окна авторизации', async ({ app }) => {
      await app.mainPage.openAuthorisationModal();
      await app.mainPage.assertAuthorizationModalAriaSnapshot();
    });
    test('Проверить доступность элементов развернутого меню', async ({ app }) => {
      await app.mainPage.openFullMenu();
      await app.mainPage.assertFullMenuAriaSnapshot();
    });
  },
);

test('Проверить переключение темы', async ({ app }) => {
  await app.mainPage.assertTheme('dark2021');
  await app.mainPage.changeThemeToWhite();
  await app.mainPage.assertTheme('white2022');
});
