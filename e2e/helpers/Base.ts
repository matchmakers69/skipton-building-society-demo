import { test as base } from "@playwright/test";
import { NavPage } from "../page-objects-model/NavPage.model";
import { BlogPage } from "../page-objects-model/BlogPage.model";
import { Header } from "../page-objects-model/Header.model";
import { PostDetailPage } from "../page-objects-model/PostDetailsPage.model";
import { Footer } from "../page-objects-model/Footer.model";

export type TestOptions = {
  navPage: NavPage;
  blogPage: BlogPage;
  postDetailPage: PostDetailPage;
  header: Header;
  footer: Footer;
};

export const test = base.extend<TestOptions>({
  navPage: async ({ page }, use) => {
    await use(new NavPage(page));
  },

  blogPage: async ({ page }, use) => {
    await use(new BlogPage(page));
  },

  postDetailPage: async ({ page }, use) => {
    await use(new PostDetailPage(page));
  },

  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
});

export { expect } from "@playwright/test";
