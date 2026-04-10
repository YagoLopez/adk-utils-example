# Conventions

## Coding Standards
- **TypeScript**: Mandatory for all logic. No `any` where avoidable.
- **Naming**: 
  - Components: PascalCase.
  - Files: kebab-case (except components which may use PascalCase).
  - Variables/Functions: camelCase.

## Styling
- **Tailwind CSS 4**: Preference for utility classes over plain CSS.
- **Shadcn UI**: Using Radix primitives with Tailwind for custom components.

## Agent Definitions
- Agents should be defined using Google ADK `LlmAgent` class.
- Tools should be defined as `FunctionTool` with Zod validation.

## Linting & Formatting
- **ESLint**: Enforced via `eslint.config.mjs`.
- **Prettier**: standard formatting.
