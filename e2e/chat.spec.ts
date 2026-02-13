import { test, expect } from "@playwright/test";
import { MockModel, GenAIAgentService } from "@yagolopez/adk-utils";
import { LlmAgent } from "@google/adk";

test.describe("Chat Functionality", () => {
  test("user can send a message and receive a response", async ({ page }) => {
    // Create agent with mock model
    const agent = new LlmAgent({
      name: "test_agent",
      description: "test-description",
      model: new MockModel("mock-model", 0, ["Response from mock model"]),
      instruction: "You are a test agent.",
    });
    const service = new GenAIAgentService(agent);

    await page.route("/api/genai-agent", async (route) => {
      const { messages } = route.request().postDataJSON();
      const response = service.createStreamingResponse(messages);
      const bodyBuffer = await response.arrayBuffer();

      await route.fulfill({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        contentType:
          response.headers.get("content-type") || "text/event-stream",
        body: Buffer.from(bodyBuffer),
      });
    });

    await page.goto("/");

    const input = page.getByPlaceholder("Ask the agent...");
    await input.fill("hola");

    const sendButton = page.getByRole("button", { name: "Send message" });
    await sendButton.click();

    await expect(page.getByText("Response from mock model")).toBeVisible();
  });
});
