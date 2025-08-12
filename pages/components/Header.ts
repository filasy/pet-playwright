import { Locator, Page } from '@playwright/test';

export class Header {
  readonly headerLocator: Locator;
  readonly addButtonLocator: Locator;
  readonly notoficationButtonLocator: Locator;
  readonly loginButtonLocator: Locator;
  readonly addButtonPopupListLocator: Locator;
  readonly notoficationPopupLocator: Locator;
  readonly userMenuLocator: Locator;
  readonly menuButtonLocator: Locator;

  constructor(private page: Page) {
    this.headerLocator = this.page.getByRole('banner');
    this.addButtonLocator = this.page.getByRole('button', { name: 'Добавить' });
    this.notoficationButtonLocator = this.page.getByRole('button', { name: 'Уведомления' });
    this.loginButtonLocator = this.page.getByRole('button', { name: 'Вход и регистрация' });
    this.userMenuLocator = this.page.getByText(
      'channel67627961jf****@gmail.comПрофильМой каналСтудия RUTUBEВыйти',
    );
    this.addButtonPopupListLocator = this.page.locator('.wdp-header-right-module__uploader ul');
    this.notoficationPopupLocator = this.page.locator('.wdp-notifications-popup-module__wrapper');
    this.menuButtonLocator = this.page.getByRole('button', {
      name: 'Открыть меню навигации',
    });
  }
}
