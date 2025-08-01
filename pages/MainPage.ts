import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step';

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
  constructor(page: Page) {
    super(page, '/');
    this.headerLocator = this.page.getByRole('banner');
    this.categoriesTabsLocator = this.page
      .getByRole('main')
      .locator('div')
      .filter({
        hasText: 'ГлавнаяРекомендацииФильмыСериалыТелешоуСпортБлогерыНовостиМузыкаПодкастыДетямТВ ',
      })
      .nth(1);
    this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
    this.headerAddButtonLocator = this.page.getByRole('button', { name: 'Добавить' })
    this.headerNotoficationButtonLocator = this.page.getByRole('button', { name: 'Уведомления' })
    this.headerLoginButtonLocator = this.page.getByRole('button', { name: 'Вход и регистрация' })
    this.headerAddButtonPopupListLocator = this.page.locator('.wdp-header-right-module__uploader ul')
    this.headerNotoficationPopupLocator = this.page.locator('.wdp-notifications-popup-module__wrapper')
    this.authorizationModalLocator = this.page.locator('iframe[title="Multipass"]').contentFrame().locator('div[role=form]')
  }

  @step()
  async openAddPopupList(){
    this.headerAddButtonLocator.click()
  }
  @step()
  async openNotificationdPopupList(){
    this.headerNotoficationButtonLocator.click()
  }  
  @step()
  async openAuthorisationModal(){
    this.headerLoginButtonLocator.click()
  }

  //assetrions
  @step()
  async assertHeaderAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot({
      name: 'header.aria.yml',
    });
  }
  @step()
  async assertCategoriesTabsAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot({
      name: 'categoriesTabs.aria.yml',
    });
  }
  @step()
  async assertMenuAriaSnapshot() {
    await expect(this.menuLocator).toMatchAriaSnapshot({
      name: 'menu.aria.yml',
    });
  }
  @step()
  async assertAddPopupListAriaSnapshot() {
    await expect(this.headerAddButtonPopupListLocator).toMatchAriaSnapshot({
      name: 'addButtonPopup.aria.yml',
    });
  }  
  @step()
  async assertNotificationPopupListAriaSnapshot() {
    await expect(this.headerNotoficationPopupLocator).toMatchAriaSnapshot({
      name: 'notoficationPopup.aria.yml',
    });
  } 
  @step()
  async assertAuthorizationModalAriaSnapshot() {
    await expect(this.authorizationModalLocator).toMatchAriaSnapshot({
      name: 'authorizationModal.aria.yml',
    });
  }     
}
