import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step_decorator';
import path from 'path';
import { Header } from './components/Header';

export class MainPage extends BasePage {
  private readonly categoriesTabsLocator: Locator;
  private readonly menuLocator: Locator;
  private readonly authorizationModalLocator: Locator;
  private readonly openMenuAriaLocator: Locator;
  private readonly changeThemeButtonLocator: Locator;
  private readonly userLogoLocator: Locator;
  private readonly header: Header;

  constructor(page: Page) {
    super(page, '/');
    this.header = new Header(this.page);
    this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
    this.openMenuAriaLocator = this.page.locator('.menu-content-module__menuOpen');
    this.userLogoLocator = this.page.getByRole('img', { name: 'Иконка канала channel67627961' });
    this.categoriesTabsLocator = this.page
      .getByRole('main')
      .locator('div')
      .filter({
        hasText: 'ГлавнаяРекомендацииФильмыСериалыТелешоуСпортБлогерыНовостиМузыкаПодкастыДетямТВ ',
      })
      .nth(1);
    this.authorizationModalLocator = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('div[role=form]');
    this.changeThemeButtonLocator = this.page.getByRole('button', {
      name: 'Переключить на светлую тему',
    });
  }

  @step()
  async openAddPopupList() {
    this.header.addButtonLocator.click();
  }
  @step()
  async openNotificationdPopupList() {
    this.header.notoficationButtonLocator.click();
  }
  @step()
  async openAuthorisationModal() {
    this.header.loginButtonLocator.click();
  }
  @step()
  async openFullMenu() {
    this.header.menuButtonLocator.click();
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
    await this.checkAriaSnapshot(this.header.headerLocator, 'header.aria.yml');
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
    await this.checkAriaSnapshot(this.header.addButtonPopupListLocator, 'addButtonPopup.aria.yml');
  }
  @step()
  async assertNotificationPopupListAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.header.notoficationPopupLocator,
      'notoficationPopup.aria.yml',
    );
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
    await this.checkAriaSnapshot(this.header.userMenuLocator, 'headerUserMenuLocator.aria.yml');
  }
  @step()
  async assertTheme(attributeValue: 'dark2021' | 'white2022') {
    await expect(this.page.locator('html')).toHaveAttribute('data-pen-theme', attributeValue);
  }
}
