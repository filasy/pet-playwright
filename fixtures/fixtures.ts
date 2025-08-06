import { Page, test as baseTest } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { CategotiesPage } from '../pages/CategotiesPage';

type MyFixture = {
  mainPage: MainPage;
  categotiesPage: CategotiesPage;
};

export const test = baseTest.extend<MyFixture>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.visit();
    await mainPage.closeCoockeisAlert();
    await mainPage.closeAdvertisementModal();
    await use(mainPage);
  },
  categotiesPage: async ({ page }, use) => {
    const categotiesPage = new CategotiesPage(page);
    await categotiesPage.visit();
    await categotiesPage.closeAdvertisementModal();
    await categotiesPage.closeCoockeisAlert();
    await categotiesPage.hideHeader();
    await use(categotiesPage);
  },
});
