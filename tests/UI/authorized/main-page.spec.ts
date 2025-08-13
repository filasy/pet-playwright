import { test } from '../../../fixtures/App';

test.beforeEach(async ({ app }) => {
  await app.mainPage.visit();
  await app.mainPage.closeCoockeisAlert();
  // await app.mainPage.closeAdvertisementModal();
});

test('Проверить доступность элементов хедера для авторизованного пользователя', async ({ app }) => {
  await app.mainPage.header.assertHeaderAriaSnapshot();
});
test('Проверить доступность элементов попапа уведомлений для авторизованного пользователя', async ({
  app,
}) => {
  await app.mainPage.header.openNotificationdPopupList();
  await app.mainPage.assertNotificationPopupListAriaSnapshot();
});
test('Проверить доступность элементов развернутого меню для авторизованного пользователя', async ({
  app,
}) => {
  await app.mainPage.header.openFullMenu();
  await app.mainPage.assertFullMenuAriaSnapshot();
});
test('Проверить доступность элементов меню пользователя в хедере для авторизованного пользователя', async ({
  app,
}) => {
  await app.mainPage.header.openHeaderUserMenu();
  await app.mainPage.assertUserMenuAriaSnapshot();
});
