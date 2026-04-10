# Architecture

## Overview
The project follows a modern Next.js 16 app-router architecture integrated with an agentic layer based on Google ADK.

## Key Layers
- **Frontend (Next.js)**: React components for the chat interface and dashboard.
- **Agentic Layer (ADK)**: Autonomous agents defined in `app/agents/`. These agents wrap LLMs and provide tool-calling capabilities.
- **API Routes**: Backend handlers in `app/api/` that bridge the frontend with the ADK agents and external LLM providers.
- **Utility Layer**: Custom wrappers (`@yagolopez/adk-utils`) for extending ADK features like Ollama support.

## Communication Flow
1. User interacts with the UI in `page.tsx`.
2. UI calls `/api/chat` or `/api/genai-agent`.
3. API route initializes the `rootAgent` (from `agent1.ts`).
4. Agent processes request, calls tools if needed, and streams response back to UI.
