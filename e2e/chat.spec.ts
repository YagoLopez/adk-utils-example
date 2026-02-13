import { test, expect } from "@playwright/test";
import { MockLlm, GenAIAgentService } from "@yagolopez/adk-utils";
import { LlmAgent } from "@google/adk";

test.describe("Chat Functionality", () => {
  test("user can send a message and receive a response", async ({ page }) => {
    // Mock response matching GenAIAgentService SSE format
    /*
    await page.route("/api/genai-agent", async (route) => {
      const { messages } = route.request().postDataJSON();
      const mockLlm = new MockLlm();
      mockLlm.setMockResponse(['I correspond to "hola"']);
      const agent = new LlmAgent({
        name: 'test_agent',
        description: 'test-description',
        model: mockLlm,
        instruction: 'You are a test agent.'
      });
      const service = new GenAIAgentService(agent);
      const response = await service.createStreamingResponse(messages);
      const bodyBuffer = await response.arrayBuffer();

      await route.fulfill({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        contentType: response.headers.get('content-type') || 'text/event-stream',
        body: Buffer.from(bodyBuffer)
      });
    });
*/

    await page.goto("/");

    const input = page.getByPlaceholder("Ask the agent...");
    await expect(input).toBeVisible();
    await input.fill("hola");

    const sendButton = page.getByRole("button", { name: "Send message" });
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // Wait for response
    await expect(page.getByText("Hello World!")).toBeVisible();
  });
});
