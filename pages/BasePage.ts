import { expect, Locator, Page, test } from '@playwright/test';
import { step } from '../utils/step_decorator';

export abstract class BasePage {
  protected constructor(
    protected readonly page: Page,
    protected readonly url: string,
  ) {}

  public async visit() {
    await test.step(`Перейти на '${this.constructor.name}' по URL ${this.url}`, async () => {
      await this.page.goto(this.url);
    });
  }

  //actions
  @step('Закрыть уведомление об использовании cookies')
  public async closeCoockeisAlert() {
    await this.page.getByLabel('Уведомление об использовании cookies').locator('button').click();
  }
  @step('Закрыть модалку с рекламой')
  public async closeAdvertisementModal() {
    await this.page
      .locator('[class*=wdp-popup-module__popup]')
      .getByRole('button', { name: 'Закрыть' })
      .click();
  }
  public async hideElement(selector: string) {
    await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        (element as HTMLElement).style.display = 'none';
      }
    }, selector);
  }

  //assertions
  public async checkAriaSnapshot(locator: Locator, ariaName: string) {
    await expect(locator).toMatchAriaSnapshot({
      name: ariaName,
    });
  }
  public async checkLayoutByScreenshot(locator: Locator, screnshotName: string) {
    await expect(locator).toHaveScreenshot(screnshotName, { maxDiffPixelRatio: 0.02 });
  }
}
