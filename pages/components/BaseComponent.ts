import { expect, Locator, Page } from "@playwright/test";

export abstract class BaseComponent {
  protected constructor(
    protected readonly page: Page,
  ) {}  
    
  //assertions
  public async checkAriaSnapshot(locator: Locator, ariaName: string) {
    await expect(locator).toMatchAriaSnapshot({
      name: ariaName,
    });
  }
}
