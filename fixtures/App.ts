import { Page, test as baseTest } from '@playwright/test';
import { MainPage, CategotiesPage, SubscriptionsPage, ForCreatorsPage} from '../pages/index';

/*
  Фасад для Page Object Model
*/
export class App {
  constructor(
    private page: Page,
    public mainPage = new MainPage(page),
    public categotiesPage = new CategotiesPage(page),
    public forCreatorsPage = new ForCreatorsPage(page),
    public subscriptionsPage = new SubscriptionsPage(page),
  ) {}
}

type MyFixture = {
  app: App;
  mainPage: MainPage;
  categotiesPage: CategotiesPage;
  forCreatorsPage: ForCreatorsPage;
  subscriptionsPage: SubscriptionsPage;
};

export const test = baseTest.extend<MyFixture>({
  app: [
    async ({ page }, use) => {
      await use(new App(page));
    },
    { title: 'app' },
  ],
  mainPage: [
    async ({ page }, use) => {
      const mainPage = new MainPage(page);
      await mainPage.visit();
      await mainPage.closeCoockeisAlert();
      await mainPage.closeAdvertisementModal();
      await use(mainPage);
    },
    { title: 'mainPage' },
  ],
  categotiesPage: [
    async ({ page }, use) => {
      const categotiesPage = new CategotiesPage(page);
      await categotiesPage.visit();
      await categotiesPage.closeAdvertisementModal();
      await categotiesPage.closeCoockeisAlert();
      await categotiesPage.hideHeader();
      await use(categotiesPage);
    },
    { title: 'categotiesPage' },
  ],
});
