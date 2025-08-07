import { Page, test as baseTest } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { CategotiesPage } from '../pages/CategotiesPage';
import { SubscriptionsPage } from '../pages/SubscriptionsPage';
import { ForCreatorsPage } from '../pages/ForCreatorsPage';

export class App {
  public readonly mainPage: MainPage;
  public readonly categotiesPage: CategotiesPage;
  public readonly forCreatorsPage: ForCreatorsPage;
  public readonly subscriptionsPage: SubscriptionsPage;

  constructor(private page: Page) {
    this.mainPage = new MainPage(this.page);
    this.categotiesPage = new CategotiesPage(this.page);
    this.forCreatorsPage = new ForCreatorsPage(this.page);
    this.subscriptionsPage = new SubscriptionsPage(this.page);
  }
}

type MyFixture = {
  app: App;
};

export const test = baseTest.extend<MyFixture>({
  app: [
    async ({ page }, use) => {
      await use(new App(page));
    },
    { title: 'POM' },
  ],
});
