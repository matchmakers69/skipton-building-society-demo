import { test } from "../../helpers/Base";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(
    "Skipton Building Society | JSONPlaceholder Blog",
  );
});

test.describe("Blog Layouts page", () => {
  test("Header", async ({ blogPage, header }) => {
    await header.isReady();
    const title = await header.getLogoText();
    expect(title).toBe("Skipton Building Society");

    await header.clickLogo();
    await blogPage.isReady();
  });

  test("Footer has correct links and text", async ({ page, footer }) => {
    await footer.isReady();

    await expect(footer.termsLink).toBeVisible();
    await expect(footer.privacyLink).toBeVisible();
    await expect(footer.copyright).toContainText("All rights reserved © 2025");
  });
});
