# Testing

## Test Frameworks
- **Jest**: Primary framework for unit and integration testing.
- **Playwright**: Framework for end-to-end (E2E) testing.

## Test Structure
- Unit tests: Located alongside components/logic or in a `__tests__` directory.
- E2E tests: Located in the `e2e/` directory.

## Key Scripts
- `npm test`: Runs Jest tests (not yet fully configured in package.json but referenced in llms.txt).
- `npm run test:e2e:headless`: Runs Playwright tests in headless mode.
- `npm run test:e2e:headed`: Runs Playwright tests with a browser window.
- `npm run test:e2e:ui`: Opens Playwright Test UI.
