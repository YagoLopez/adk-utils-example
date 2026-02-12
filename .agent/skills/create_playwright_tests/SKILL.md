---
name: create_playwright_tests
description: Comprehensive guide and instructions for creating, managing, and running End-to-End (E2E) tests using Playwright.
---

# Create Playwright Tests Skill

This skill provides a standardized workflow for adding E2E coverage to the application using Playwright.

## 1. Prerequisites Check
Before creating tests, ensure Playwright is configured:
- Check `playwright.config.ts` exists.
- Ensure `@playwright/test` is in `package.json`.
- Run `npx playwright install` if browsers are missing.

## 2. Test Creation Workflow

### A. Identify Key User Flows
- **Authentication**: Login/Signup, Password reset.
- **core Features**: Critical paths (e.g., sending a message, checkout).
- **Navigation**: Verify routes load correctly.

### B. Create Test File
- Location: `e2e/<feature>.spec.ts` (or `tests/`)
- Naming: Use descriptive names like `chat-flow.spec.ts`.

### C. Writing the Test
Use the standard Playwright syntax:

```typescript
import { test, expect } from '@playwright/test';

test('user can [perform action]', async ({ page }) => {
  // 1. Arrange
  await page.goto('/');
  
  // 2. Act
  await page.getByPlaceholder('Ask the agent...').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();
  
  // 3. Assert
  await expect(page.locator('.message-bubble')).toContainText('Hello');
});
```

**Best Practices:**
- Use `getByRole`, `getByLabel`, `getByPlaceholder` locators instead of CSS selectors when possible.
- Ensure tests are independent.
- Use `test.describe` to group related tests.
- Mock external APIs (like AI endpoints) to ensure deterministic results.

## 3. Mocking API Routes
For AI agents or non-deterministic APIs, use `page.route`:

```typescript
await page.route('/api/genai-agent', async route => {
  const json = { id: '1', role: 'assistant', content: 'Mocked response' };
  await route.fulfill({ json });
});
```

## 4. Running Tests
- Run all: `npx playwright test`
- Run specific file: `npx playwright test e2e/chat.spec.ts`
- Debug mode: `npx playwright test --debug`
- UI mode: `npx playwright test --ui`

## 5. Verification
- Always run the newly created test to ensure it passes.
- Check the report if it fails: `npx playwright show-report`.
