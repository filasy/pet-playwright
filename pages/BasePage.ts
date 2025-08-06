import { Page, test } from '@playwright/test';
import { step } from '../utils/step_decorator';

export abstract class BasePage {
  protected constructor(protected readonly page: Page, protected readonly url: string) {}

  async visit() {
    await test.step(`Перейти на '${this.constructor.name}' по URL ${this.url}`, async () => {
      await this.page.goto(this.url);
    });
  }

  @step('Закрыть уведомление об использовании cookies')
  async closeCoockeisAlert() {
    await this.page.getByLabel('Уведомление об использовании cookies').locator('button').click();
  }
  @step('Закрыть модалку с рекламой')
  async closeAdvertisementModal() {
    await this.page
      .locator('[class*=wdp-popup-module__popup]')
      .getByRole('button', { name: 'Закрыть' })
      .click();
  }
}
