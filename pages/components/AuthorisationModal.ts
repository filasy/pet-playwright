import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { th } from '@faker-js/faker/.';
import { step } from '../../utils/step-decorator';

export class AuthorisationModal extends BaseComponent {
  private readonly loginInput = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('textbox', { name: 'Введите телефон' });
  private readonly nextButton = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Продолжить' });
  private readonly passwordInput = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('#login-password');
  private readonly loginButton = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Войти', exact: true });
  private readonly authorizationModalLocator = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('div[role=form]');  
  constructor(page: Page) {
    super(page);
  }

  async login(login: string, password: string) {
    await this.loginInput.fill(login);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  //asserts
   @step()
   async assertAuthorizationModalAriaSnapshot() {
     await this.checkAriaSnapshot(
       this.authorizationModalLocator,
       'authorizationModal.aria.yml',
     );
   } 
}
