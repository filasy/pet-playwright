import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../utils/step-decorator';
import { Header } from './components/HeaderComponent';
import { AuthorisationModal } from './components/AuthorisationModal';

export class MainPage extends BasePage {
  public readonly header = new Header(this.page);
  public readonly authorisationModal = new AuthorisationModal(this.page);
  private readonly categoriesTabsLocator = this.page
    .getByRole('main')
    .locator('div')
    .filter({
      hasText:
        'ГлавнаяРекомендацииФильмыСериалыТелешоуСпортБлогерыНовостиМузыкаПодкастыДетямТВ ',
    })
    .nth(1);
  private readonly menuLocator = this.page.getByLabel(
    'Облегченная панель навигации',
  );
  private readonly fullMenuAriaLocator = this.page.locator(
    '.menu-content-module__menuOpen',
  );
  private readonly userMenuLocator = this.page.getByText(
    'channel67627961jf****@gmail.comПрофильМой каналСтудия RUTUBEВыйти',
  );
  private readonly addPopupListLocator = this.page.locator(
    '.wdp-header-right-module__uploader ul',
  );
  private readonly notoficationPopupLocator = this.page.locator(
    '.wdp-notifications-popup-module__wrapper',
  );

  constructor(page: Page) {
    super(page, '/');
  }
  //actions
  @step()
  async login(login: string, password: string) {
    await this.closeAdvertisementModal();
    await this.header.openAuthorisationModal();
    await this.authorisationModal.login(login, password);
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
  @step()
  public async assertLoginButtonFontSize() {
    await this.checkToHaveCSS(
      this.header.loginButtonLocator,
      'font-size',
      '14px',
    );
  }
}
