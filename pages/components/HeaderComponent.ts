import { Page } from '@playwright/test';
import { step } from '../../utils/step-decorator';
import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  readonly headerLocator = this.page.getByRole('banner');
  private readonly addButtonLocator = this.page.getByRole('button', {
    name: 'Добавить',
  });
  private readonly notoficationButtonLocator = this.page.getByRole('button', {
    name: 'Уведомления',
  });
  private readonly loginButtonLocator = this.page.getByRole('button', {
    name: 'Вход и регистрация',
  });
  private readonly menuButtonLocator = this.page.getByRole('button', {
    name: 'Открыть меню навигации',
  });
  public readonly userLogoButtonLocator = this.page.getByRole('img', {
    name: 'Иконка канала channel67627961',
  });
  private readonly changeThemeButtonLocator = this.page.getByRole('button', {
    name: 'Переключить на светлую тему',
  });

  constructor(page: Page) {
    super(page);
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
