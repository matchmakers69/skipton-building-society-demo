import { Page, Locator } from "@playwright/test";
export type { Page } from "@playwright/test";

export class PostDetailPage {
  readonly page: Page;
  readonly title: Locator;
  readonly backLink: Locator;
  readonly content: Locator;
  readonly category: Locator;
  readonly publishDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h1");
    this.backLink = page.locator('[data-testid="back-link"]');
    this.content = page.locator(".post-content, .content");
    this.category = page.locator("text=/Category:/");
    this.publishDate = page.locator("text=/Published at:/");
  }

  async isReady() {
    await this.title.waitFor({ state: "visible" });
    await this.backLink.waitFor({ state: "visible" });
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? "";
  }

  async goBack() {
    const backElement = this.backLink.first();

    if ((await backElement.count()) > 0) {
      await backElement.waitFor({ state: "visible", timeout: 3000 });
      await backElement.click();
    } else {
      await this.page.goBack();
      console.log("Used browser back");
    }
  }

  async getCategoryText(): Promise<string> {
    return (await this.category.textContent()) ?? "";
  }

  async getPublishDate(): Promise<string> {
    return (await this.publishDate.textContent()) ?? "";
  }
}
