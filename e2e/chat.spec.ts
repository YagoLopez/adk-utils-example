import { test, expect } from "@playwright/test";

test.describe("Chat Functionality", () => {
  test("user can send a message and receive a response", async ({ page }) => {
    // Mock response matching GenAIAgentService SSE format
    await page.route("/api/genai-agent", async (route) => {
      const chunks = [
        { type: "start" },
        { type: "start-step" },
        { type: "text-start", id: "text-1" },
        { type: "text-delta", id: "text-1", delta: 'I correspond to "hola"' },
        { type: "text-end", id: "text-1" },
        { type: "finish-step" },
        { type: "finish", finishReason: "stop" },
      ];

      const body = chunks
        .map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`)
        .join("");

      await route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body,
      });
    });

    await page.goto("/");

    const input = page.getByPlaceholder("Ask the agent...");
    await expect(input).toBeVisible();
    await input.fill("hola");

    const sendButton = page.getByRole("button", { name: "Send message" });
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // Wait for response
    await expect(page.getByText('I correspond to "hola"')).toBeVisible();
  });
});
