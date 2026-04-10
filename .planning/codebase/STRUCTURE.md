# Project Structure

## Directory Layout

- `app/`: Next.js 16 application code (routes, layouts).
    - `agents/`: ADK agent definitions (e.g., `agent1.ts`).
    - `api/`: Route handlers for chat and agent interactions.
- `components/`: Reusable React components (UI primitives, chat components).
- `lib/`: Shared utility functions and shared logic.
- `hooks/`: Custom React hooks for state and interaction management.
- `e2e/`: Playwright end-to-end tests.
- `scripts/`: Helper scripts for development or deployment.
- `public/`: Static assets (images, icons).
- `.planning/`: GSD planning and context artifacts.
- `.agent/`: ADK specific configuration and skills.

## Key Files
- `package.json`: Project dependencies and scripts.
- `llms.txt`: Project overview for LLM ingestion.
- `playwright.config.ts`: E2E test configuration.
- `jest.config.ts`: Unit test configuration.
