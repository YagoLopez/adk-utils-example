import { rootAgent } from "@/app/agents/agent1";
import { GenAIAgentService, MockLlm } from "@yagolopez/adk-utils";
import { UIMessage } from "ai";
import { LlmAgent } from "@google/adk";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const mockLlm = new MockLlm();
    mockLlm.setMockResponse(['I correspond to "hola"']);
    const agent = new LlmAgent({
      name: "test_agent",
      description: "test-description",
      model: new MockLlm(),
      instruction: "You are a test agent.",
    });

    const service = new GenAIAgentService(agent);

    if (!service.validateMessages(messages)) {
      return GenAIAgentService.createErrorResponse(
        "Messages are required",
        400,
      );
    }

    return service.createStreamingResponse(messages);
  } catch (error) {
    console.error(error);
    return GenAIAgentService.createErrorResponse(
      "Internal Server Error",
      500,
      String(error),
    );
  }
}
