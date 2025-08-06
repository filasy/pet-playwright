import { test } from '../../fixtures/App';

test.beforeEach(async ({ app }) => {
  await app.mainPage.visit();
  await app.mainPage.closeCoockeisAlert();
  // await app.mainPage.closeAdvertisementModal();
});

test('Проверить доступность элементов хедера для авторизованного пользователя', async ({ app }) => {
  await app.mainPage.assertHeaderAriaSnapshot();
});
test('Проверить доступность элементов попапа уведомлений для авторизованного пользователя', async ({
  app,
}) => {
  await app.mainPage.openNotificationdPopupList();
  await app.mainPage.assertNotificationPopupListAriaSnapshot();
});
test('Проверить доступность элементов развернутого меню для авторизованного пользователя', async ({
  app,
}) => {
  await app.mainPage.openFullMenu();
  await app.mainPage.assertFullMenuAriaSnapshot();
});
test('Проверить доступность элементов меню пользователя в хедере для авторизованного пользователя', async ({
  app,
}) => {
  await app.mainPage.openHeaderUserMenu();
  await app.mainPage.assertHeaderUserMenuAriaSnapshot();
});
