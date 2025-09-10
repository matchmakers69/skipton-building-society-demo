import { Page } from "@playwright/test";
export type { Page } from "@playwright/test";

export class NavPage {
  public url = "/";
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto(this.url);
  }

  async goBlogPage() {
    await this.page.goto("/"); // for the real app perhaps we would have "/blog"
  }
}
