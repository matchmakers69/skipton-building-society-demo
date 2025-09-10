import { test } from "../../helpers/Base";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(
    "Skipton Building Society | JSONPlaceholder Blog",
  );
});

test.describe("BlogPage", () => {
  test("Navigate to blog page", async ({ navPage, blogPage }) => {
    await navPage.goBlogPage();
    await blogPage.isReady();
    const title = await blogPage.getTitle();
    expect(title).toBe("Welcome to Skipton Blog");
  });

  test("Verify blog posts are displayed", async ({ blogPage }) => {
    await blogPage.isReady();
    const postCount = await blogPage.getPostsCount();
    expect(postCount).toBeGreaterThan(0);
  });

  test("Navigate to blog post detail page", async ({
    blogPage,
    postDetailPage,
    page,
  }) => {
    await blogPage.isReady();

    const postCount = await blogPage.getPostsCount();
    expect(postCount).toBeGreaterThan(0);

    await blogPage.openFirstPost();

    await page.waitForURL("**/posts/1");

    await postDetailPage.isReady();

    const detailPageTitle = await postDetailPage.getTitle();
    expect(detailPageTitle).toContain("Lorem ipsum");
  });

  test("Navigate back from detail page to blog listing", async ({
    blogPage,
    postDetailPage,
    page,
  }) => {
    await blogPage.isReady();
    await blogPage.openFirstPost();
    await page.waitForURL("**/posts/1");
    await postDetailPage.isReady();
    await postDetailPage.goBack();

    await page.waitForURL("/");
    await blogPage.isReady();

    const title = await blogPage.getTitle();
    expect(title).toBe("Welcome to Skipton Blog");
  });

  test("Verify post detail page content", async ({
    blogPage,
    postDetailPage,
    page,
  }) => {
    await blogPage.isReady();
    await blogPage.openFirstPost();
    await page.waitForURL("**/posts/1");
    await postDetailPage.isReady();

    const categoryText = await postDetailPage.getCategoryText();
    expect(categoryText).toContain("Category:");

    const publishDate = await postDetailPage.getPublishDate();
    expect(publishDate).toContain("Published at:");
  });

  test("Navigate to error page and go back", async ({ blogPage, page }) => {
    await blogPage.isReady();

    await blogPage.openErrorPost();

    await page.waitForURL("**/posts/2");

    await blogPage.goHome();

    await page.waitForURL("/");

    const title = await blogPage.getTitle();
    expect(title).toBe("Welcome to Skipton Blog");
  });
});
