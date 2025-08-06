import { Page, test as baseTest } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { CategotiesPage } from '../pages/CategotiesPage';

export class App {
  public readonly mainPage: MainPage;
  public readonly categotiesPage: CategotiesPage;

  constructor(private page: Page) {
    this.mainPage = new MainPage(this.page);
    this.categotiesPage = new CategotiesPage(this.page);
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
