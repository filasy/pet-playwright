import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step-decorator';

export class SubscriptionsPage extends BasePage {
  private readonly contentPageLocator: Locator;
  constructor(page: Page) {
    super(page, '/subscriptions');
    this.contentPageLocator = this.page.locator('.application-module__content');
  }

  //assertions
  @step()
  async assertContentPageAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.contentPageLocator,
      'contentPage.aria.yml',
    );
  }
}
