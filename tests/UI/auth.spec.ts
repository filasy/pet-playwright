import { test } from '@playwright/test';
import path from 'path';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { App } from '../../fixtures/App';
chromium.use(StealthPlugin());

test('Аутентификация', {}, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const app = new App(page);
  await app.mainPage.visit();
  await app.mainPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  const authFile = path.join(__dirname, '../../.test/auth.json');
  await page.context().storageState({ path: authFile });
});
