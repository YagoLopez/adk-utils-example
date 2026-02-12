import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ADK Agent Chat/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Check for the main heading or a specific element on the home page
  // Adjust the selector based on the actual content of the home page
  // For now, let's check if the main element exists
  await expect(page.locator('main')).toBeVisible();
});
