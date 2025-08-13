import test from '@playwright/test';
import { ForCreatorsPage } from '../../../pages/ForCreatorsPage';

ForCreatorsPage.testParams.forEach(({ testName, url, screnshotName }) => {
  test(`Проверить лейаут таба - ${testName}`, async ({ page }) => {
    const forCreatorsPage = new ForCreatorsPage(page);
    await forCreatorsPage.open(url);
    await forCreatorsPage.assertPageLayoutScrenshot(screnshotName);
  });
});
