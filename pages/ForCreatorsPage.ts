import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step-decorator';

export class ForCreatorsPage extends BasePage {
  private readonly pageContentLocator: Locator;
  static readonly testParams = [
    {
      url: '/for_creators/#main',
      screnshotName: 'mainTab.png',
      testName: 'Главная',
    },
    {
      url: '/for_creators/#steps',
      screnshotName: 'stepsTab.png',
      testName: 'Первые шаги',
    },
    {
      url: '/for_creators/#faq',
      screnshotName: 'faqTab.png',
      testName: 'Как развивать канал',
    },
    {
      url: '/for_creators/#monetization',
      screnshotName: 'monetizationTab.png',
      testName: 'Монетизация',
    },
    {
      url: '/for_creators/#rules',
      screnshotName: 'rulesTab.png',
      testName: 'Правила',
    },
    {
      url: '/for_creators/#team',
      screnshotName: 'teamTab.png',
      testName: 'Команда R',
    },
  ];
  constructor(page: Page) {
    super(page, '/for_creators');
    this.pageContentLocator = this.page.locator('#___gatsby');
  }

  //actions
  @step()
  async open(url: string) {
    await this.page.goto(url);
  }
  //assertions
  @step()
  async assertPageLayoutScrenshot(screnshotName: string) {
    await this.checkLayoutByScreenshot(this.pageContentLocator, screnshotName);
  }
}
