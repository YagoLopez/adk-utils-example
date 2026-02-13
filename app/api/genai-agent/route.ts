import { rootAgent } from "@/app/agents/agent1";
import { GenAIAgentService } from "@yagolopez/adk-utils";
import { UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const service = new GenAIAgentService(rootAgent);

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
