import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step-decorator';
import { Header } from './components/HeaderComponent';
import { AuthorisationModal } from './components/AuthorisationModal';

export class MainPage extends BasePage {
  public readonly header: Header;
  private readonly authorisationModal: AuthorisationModal;
  private readonly categoriesTabsLocator: Locator;
  private readonly menuLocator: Locator;
  private readonly fullMenuAriaLocator: Locator;
  private readonly userMenuLocator: Locator;
  private readonly addPopupListLocator: Locator;
  private readonly notoficationPopupLocator: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.header = new Header(this.page);
    this.authorisationModal = new AuthorisationModal(this.page) 
    this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
    this.fullMenuAriaLocator = this.page.locator(
      '.menu-content-module__menuOpen',
    );
    this.categoriesTabsLocator = this.page
      .getByRole('main')
      .locator('div')
      .filter({
        hasText:
          'ГлавнаяРекомендацииФильмыСериалыТелешоуСпортБлогерыНовостиМузыкаПодкастыДетямТВ ',
      })
      .nth(1);

    this.userMenuLocator = this.page.getByText(
      'channel67627961jf****@gmail.comПрофильМой каналСтудия RUTUBEВыйти',
    );
    this.addPopupListLocator = this.page.locator(
      '.wdp-header-right-module__uploader ul',
    );
    this.notoficationPopupLocator = this.page.locator(
      '.wdp-notifications-popup-module__wrapper',
    );
  }
  //actions
  @step()
  async login(login: string, password: string) {
    // await this.closeAdvertisementModal(); не всплывает на ci
    await this.header.openAuthorisationModal();
    await this.authorisationModal.login(login,password);
    await this.header.userLogoButtonLocator.click();
  }

  //assetrions
  @step()
  async assertCategoriesTabsAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.categoriesTabsLocator,
      'categoriesTabs.aria.yml',
    );
  }
  @step()
  async assertMenuAriaSnapshot() {
    await this.checkAriaSnapshot(this.menuLocator, 'menu.aria.yml');
  }
  @step()
  async assertFullMenuAriaSnapshot() {
    await this.checkAriaSnapshot(this.fullMenuAriaLocator, 'fullMenu.aria.yml');
  }
  @step()
  async assertTheme(attributeValue: 'dark2021' | 'white2022') {
    await expect(this.page.locator('html')).toHaveAttribute(
      'data-pen-theme',
      attributeValue,
    );
  }
  @step()
  async assertUserMenuAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.userMenuLocator,
      'headerUserMenuLocator.aria.yml',
    );
  }
  @step()
  async assertNotificationPopupListAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.notoficationPopupLocator,
      'notoficationPopup.aria.yml',
    );
  }
  @step()
  async assertAddPopupListAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.addPopupListLocator,
      'addButtonPopup.aria.yml',
    );
  }
}
