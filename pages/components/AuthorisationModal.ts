import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { th } from '@faker-js/faker/.';
import { step } from '../../utils/step-decorator';

export class AuthorisationModal extends BaseComponent {
  private readonly loginInput: Locator;
  private readonly nextButton: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly authorizationModalLocator: Locator;  
  constructor(page: Page) {
    super(page);
    this.loginInput = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('textbox', { name: 'Введите телефон' });
    this.nextButton = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Продолжить' });
    this.passwordInput = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('#login-password');
    this.loginButton = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .getByRole('button', { name: 'Войти', exact: true });
        this.authorizationModalLocator = this.page
      .locator('iframe[title="Multipass"]')
      .contentFrame()
      .locator('div[role=form]');  
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
