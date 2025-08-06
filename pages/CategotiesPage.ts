import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step_decorator';

export class CategotiesPage extends BasePage {
  private readonly contentPageLocator: Locator;
  constructor(page: Page) {
    super(page, '/categories');
    this.contentPageLocator = this.page.locator('.grid-module__grid');
  }

  //assertion
  @step()
  async assertContentPageLayoutScrenshot() {
    await this.checkLayoutByScreenshot(this.contentPageLocator, 'contentPageLayout.png');
  }
  @step()
  async hideHeader() {
    await this.hideElement('header');
  }
}
