import { test } from '../../fixtures/App';

test.beforeEach(async ({ app }) => {
  await app.mainPage.visit();
  await app.mainPage.closeCoockeisAlert();
});

test('Проверить доступность элементов хедера', async ({ app }) => {
  await app.mainPage.assertHeaderAriaSnapshot();
});
test('Проверить доступность элементов попапа уведомлений', async ({ app }) => {
  await app.mainPage.openNotificationdPopupList();
  await app.mainPage.assertNotificationPopupListAriaSnapshot();
});
test('Проверить доступность элементов развернутого меню', async ({ app }) => {
  await app.mainPage.openFullMenu();
  await app.mainPage.assertFullMenuAriaSnapshot;
});
