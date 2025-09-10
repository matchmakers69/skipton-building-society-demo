import { Page, Locator } from "@playwright/test";

export class Footer {
  readonly page: Page;
  readonly container: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator("#skipton-footer");

    this.termsLink = this.container.getByRole("link", {
      name: "Terms and conditions",
    });
    this.privacyLink = this.container.getByRole("link", {
      name: "Privacy policy",
    });
    this.copyright = this.container.locator("text=All rights reserved");
  }

  async isReady() {
    await this.container.waitFor({ state: "visible" });
  }
}
