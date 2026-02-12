import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ADK Agent Chat/);
});

test("displays main content", async ({ page }) => {
  await page.goto("/");

  // Check for the main landmark
  await expect(page.getByRole("main")).toBeVisible();
});
