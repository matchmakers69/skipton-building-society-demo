import { defineConfig, devices, PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import { TestOptions } from "./e2e/helpers/Base";

dotenv.config();

const config: PlaywrightTestConfig<TestOptions> = defineConfig({
  testDir: "./e2e/tests",
  timeout: 60_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [["dot"], ["junit", { outputFile: "test-results.xml" }]]
    : [["html", { open: "always" }]],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    video: "off",
    timezoneId: "Europe/London",
  },

  projects: [
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",
      },
    },
    {
      name: "WebKit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  outputDir: "test-results/",

  webServer: {
    command: "npm run dev",
    url: process.env.BASE_URL || "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

export default config;
