# Concerns & Technical Debt

## Current Issues
- **Jest Setup**: `npm test` script is not explicitly defined in `package.json`'s `scripts` block, although it is referenced in documentation. Needs alignment.
- **Agent Models**: Various models (Gemini, Ollama) are commented out in `agent1.ts`. Coordination on which model is "active" for development vs production is needed.
- **Next.js 16 Warnings**: Experimental features might lead to instability as the framework is very new.

## Technical Debt
- **Tool Implementations**: Many tools are currently "mocked" (e.g., `getCurrentTime`). Real integrations need to be implemented.
- **Documentation**: `llms.txt` is useful but needs regular updates as the codebase evolves.
- **Error Handling**: ADK error boundaries and retry logic for tool calls aren't fully robust yet.
