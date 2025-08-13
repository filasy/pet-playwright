import { test } from '@playwright/test';
import path from 'path';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
chromium.use(StealthPlugin());

test('Authentication', async () => {
  const authFile = path.join(__dirname, '../../.test/auth.json');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  await page
    .locator('[class*=wdp-popup-module__popup]')
    .getByRole('button', { name: 'Закрыть' })
    .click();
  await page.getByRole('button', { name: 'Вход и регистрация' }).click();
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('textbox', { name: 'Введите телефон' })
    .fill(process.env.LOGIN!);
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('button', { name: 'Продолжить' })
    .click();
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .locator('#login-password')
    .fill(process.env.PASSWORD!);
  await page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .getByRole('button', { name: 'Войти', exact: true })
    .click();
  await page.getByRole('img', { name: 'Иконка канала channel67627961' }).click();
  await page.getByRole('link', { name: 'Профиль' }).click();
  await page.context().storageState({ path: authFile });
});
