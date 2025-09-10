import { Page, Locator } from "@playwright/test";
export type { Page } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly textLogo: Locator;
  constructor(page: Page) {
    this.page = page;
    this.textLogo = page.locator(".logo-text");
  }

  async isReady() {
    await this.textLogo.waitFor({ state: "visible" });
  }

  async getLogoText(): Promise<string> {
    return (await this.textLogo.textContent())?.trim() ?? "";
  }

  async clickLogo() {
    await this.textLogo.click();
  }
}
