import { Locator, Page } from '@playwright/test';
import { step } from '../../utils/step-decorator';
import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  readonly headerLocator: Locator;
  private readonly addButtonLocator: Locator;
  private readonly notoficationButtonLocator: Locator;
  private readonly loginButtonLocator: Locator;
  private readonly menuButtonLocator: Locator;
  private readonly userLogoButtonLocator: Locator;
  private readonly changeThemeButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.headerLocator = this.page.getByRole('banner');
    this.addButtonLocator = this.page.getByRole('button', { name: 'Добавить' });
    this.notoficationButtonLocator = this.page.getByRole('button', {
      name: 'Уведомления',
    });
    this.loginButtonLocator = this.page.getByRole('button', {
      name: 'Вход и регистрация',
    });
    this.menuButtonLocator = this.page.getByRole('button', {
      name: 'Открыть меню навигации',
    });
    this.userLogoButtonLocator = this.page.getByRole('img', {
      name: 'Иконка канала channel67627961',
    });
    this.changeThemeButtonLocator = this.page.getByRole('button', {
      name: 'Переключить на светлую тему',
    });
  }

  //actions
  @step()
  async openAddPopupList() {
    this.addButtonLocator.click();
  }
  @step()
  async openNotificationdPopupList() {
    this.notoficationButtonLocator.click();
  }
  @step()
  async openAuthorisationModal() {
    this.loginButtonLocator.click();
  }
  @step()
  async openFullMenu() {
    this.menuButtonLocator.click();
  }
  @step()
  async openHeaderUserMenu() {
    this.userLogoButtonLocator.click();
  }
  @step()
  async changeThemeToWhite() {
    this.changeThemeButtonLocator.click();
  }

  //assertions
  @step()
  async assertHeaderAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerLocator, 'header.aria.yml');
  }
}
