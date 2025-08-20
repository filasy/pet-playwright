import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { step } from '../../utils/step-decorator';

export class AuthorisationModal extends BaseComponent {
  private readonly modalLocator = this.page
    .locator('iframe[title="Multipass"]')
    .contentFrame()
    .locator('div[role=form]');
  private readonly loginInput = this.modalLocator.locator(
    '#phone-or-email-login',
  );
  private readonly nextButton = this.modalLocator.locator(
    '#submit-login-continue',
  );
  private readonly passwordInput =
    this.modalLocator.locator('#login-password');
  private readonly loginButton =
    this.modalLocator.locator('#submit-login');

  constructor(page: Page) {
    super(page);
  }

  //actions
  @step()
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
      this.modalLocator,
      'authorizationModal.aria.yml',
    );
  }
}
