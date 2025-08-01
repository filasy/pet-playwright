import { Page, test } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page, protected readonly url: string) {}

  public async visit() {
    await test.step(`Перейти на '${this.constructor.name}' по URL ${this.url}`, async () => {
      await this.page.goto(this.url);
    });
  }
}
