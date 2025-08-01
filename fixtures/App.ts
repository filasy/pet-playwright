import { Page, test as baseTest } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

export class App {
  public readonly mainPage: MainPage;

  constructor(private page: Page) {
    this.mainPage = new MainPage(this.page);
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
    { title: 'Create POM' },
  ],
});
