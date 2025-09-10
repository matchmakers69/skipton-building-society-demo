import { Page, Locator } from "@playwright/test";
export type { Page } from "@playwright/test";

export class BlogPage {
  readonly page: Page;
  readonly title: Locator;
  readonly posts: Locator;
  readonly viewMoreLink: Locator;
  readonly showErrorButton: Locator;
  readonly goHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h1");
    this.posts = page.locator(".post-card");
    this.viewMoreLink = page.locator(
      "a[href*='posts/1']:has-text('View more')",
    );
    this.showErrorButton = page.locator("button:has(a:text('Show error'))");
    this.goHomeButton = page.locator("button:has-text('Go Home')");
  }

  async goto() {
    await this.page.goto("/");
  }

  async isReady() {
    await this.title.waitFor({ state: "visible" });
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent()) ?? "";
  }

  async openFirstPost() {
    await this.posts.first().waitFor({ state: "visible" });
    await this.viewMoreLink.waitFor({ state: "visible", timeout: 10000 });
    await this.viewMoreLink.click();
  }

  async getPostsCount(): Promise<number> {
    await this.posts.first().waitFor({ state: "visible" });
    return await this.posts.count();
  }

  async openErrorPost() {
    const showErrorLink = this.page.locator(
      "a[href*='posts/2']:has-text('Show error')",
    );
    await showErrorLink.waitFor({ state: "visible" });
    await showErrorLink.click();
  }

  async goHome() {
    await this.goHomeButton.waitFor({ state: "visible" });
    await this.goHomeButton.click();
  }

  async getFirstPostTitle(): Promise<string> {
    const firstPostTitle = this.posts
      .first()
      .locator(
        ".card-header h2, .card-header h3, .card-header [class*='title']",
      );
    return (await firstPostTitle.textContent()) ?? "";
  }
}
