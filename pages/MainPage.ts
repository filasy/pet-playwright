import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step_decorator';
import path from 'path';

export class MainPage extends BasePage {
  private readonly headerLocator: Locator;
  private readonly categoriesTabsLocator: Locator;
  private readonly menuLocator: Locator;
  private readonly headerAddButtonLocator: Locator;
  private readonly headerNotoficationButtonLocator: Locator;
  private readonly headerLoginButtonLocator: Locator;
  private readonly headerAddButtonPopupListLocator: Locator;
  private readonly headerNotoficationPopupLocator: Locator;
  private readonly authorizationModalLocator: Locator;
  private readonly headerMenuButtonLocator: Locator;
  private readonly openMenuAriaLocator: Locator;
  private readonly changeThemeButtonLocator: Locator;
  private readonly userLogoLocator: Locator;
  private readonly headerUserMenuLocator: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.headerLocator = this.page.getByRole('banner');
    this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
    this.headerAddButtonLocator = this.page.getByRole('button', { name: 'Добавить' });
    this.headerNotoficationButtonLocator = this.page.getByRole('button', { name: 'Уведомления' });
    this.headerLoginButtonLocator = this.page.getByRole('button', { name: 'Вход и регистрация' });
    this.openMenuAriaLocator = this.page.locator('.menu-content-module__menuOpen');
    this.userLogoLocator = this.page.getByRole('img', { name: 'Иконка канала channel67627961' });
    this.headerUserMenuLocator = this.page.getByText(
      'channel67627961jf****@gmail.comПрофильМой каналСтудия RUTUBEВыйти',
    );
    this.categoriesTabsLocator = this.page
      .getByRole('main')
      .locator('div')
      .filter({
        hasText: 'ГлавнаяРекомендацииФильмыСериалыТелешоуСпортБлогерыНовостиМузыкаПодкастыДетямТВ ',
      })
      .nth(1);
    this.headerAddButtonPopupListLocator = this.page.locator(
      '.wdp-header-right-module__uploader ul',
    );
    this.headerNotoficationPopupLocator = this.page.locator(
      '.wdp-notifications-popup-module__wrapper',
    );
    this.authorizationModalLocator = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('div[role=form]');
    this.headerMenuButtonLocator = this.page.getByRole('button', {
      name: 'Открыть меню навигации',
    });

    this.changeThemeButtonLocator = this.page.getByRole('button', {
      name: 'Переключить на светлую тему',
    });
  }

  //actions
  @step()
  async login() {
    const authFile = path.join(__dirname, '../.test/auth.json');
    await this.headerLoginButtonLocator.click();
    await this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('textbox', { name: 'Введите телефон' })
      .fill(process.env.LOGIN!);
    await this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Продолжить' })
      .click();
    await this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('#login-password')
      .fill(process.env.PASSWORD!);
    await this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Войти', exact: true })
      .click();
    await expect(this.userLogoLocator).toBeVisible();
    await this.openHeaderUserMenu();
    await this.page.getByRole('link', { name: 'Профиль' }).click();
    await this.page.context().storageState({ path: authFile });
  }

  @step()
  async openAddPopupList() {
    this.headerAddButtonLocator.click();
  }
  @step()
  async openNotificationdPopupList() {
    this.headerNotoficationButtonLocator.click();
  }
  @step()
  async openAuthorisationModal() {
    this.headerLoginButtonLocator.click();
  }
  @step()
  async openFullMenu() {
    this.headerMenuButtonLocator.click();
  }
  @step()
  async changeThemeToWhite() {
    this.changeThemeButtonLocator.click();
  }
  @step()
  async openHeaderUserMenu() {
    this.userLogoLocator.click();
  }

  //assetrions
  @step()
  async assertHeaderAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerLocator, 'header.aria.yml');
  }
  @step()
  async assertCategoriesTabsAriaSnapshot() {
    await this.checkAriaSnapshot(this.categoriesTabsLocator, 'categoriesTabs.aria.yml');
  }
  @step()
  async assertMenuAriaSnapshot() {
    await this.checkAriaSnapshot(this.menuLocator, 'menu.aria.yml');
  }
  @step()
  async assertAddPopupListAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerAddButtonPopupListLocator, 'addButtonPopup.aria.yml');
  }
  @step()
  async assertNotificationPopupListAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerNotoficationPopupLocator, 'notoficationPopup.aria.yml');
  }
  @step()
  async assertAuthorizationModalAriaSnapshot() {
    await this.checkAriaSnapshot(this.authorizationModalLocator, 'authorizationModal.aria.yml');
  }
  @step()
  async assertFullMenuAriaSnapshot() {
    await this.checkAriaSnapshot(this.openMenuAriaLocator, 'fullMenu.aria.yml');
  }
  @step()
  async assertHeaderUserMenuAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerUserMenuLocator, 'headerUserMenuLocator.aria.yml');
  }
  @step()
  async assertTheme(attributeValue: 'dark2021' | 'white2022') {
    await expect(this.page.locator('html')).toHaveAttribute('data-pen-theme', attributeValue);
  }
}
