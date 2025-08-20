import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step-decorator';

export class CategotiesPage extends BasePage {
  private readonly contentPageLocator = this.page.locator('.grid-module__grid');

  constructor(page: Page) {
    super(page, '/categories');
  }

  //actions
  @step()
  async hideHeader() {
    await this.hideElement('header');
  }

  //assertion
  @step()
  async assertContentPageLayoutScrenshot() {
    await this.checkLayoutByScreenshot(
      this.contentPageLocator,
      'contentPageLayout.png',
    );
  }
}
