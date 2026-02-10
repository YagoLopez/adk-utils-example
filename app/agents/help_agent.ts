import { FunctionTool, LlmAgent } from "@google/adk";
import { z } from "zod";
import { OllamaModel } from "@yagolopez/adk-utils";

/* Echo tool implementation as a dummy tool */
const simpleEcho = new FunctionTool({
  name: "simple_echo",
  description: "Echoes back the input text.",
  parameters: z.object({
    text: z.string().describe("The text to echo."),
  }),
  execute: ({ text }) => {
    return {
      status: "success",
      report: `Echo: ${text}`,
    };
  },
});

/* Help tool implementation */
const getHelp = new FunctionTool({
  name: "get_help",
  description: "Returns a list of available tools with their descriptions.",
  parameters: z.object({}), // No parameters needed
  execute: () => {
    // We define the list of tools manually here to ensure accuracy for the report
    const tools = [
      { name: "simple_echo", description: "Echoes back the input text." },
      {
        name: "get_help",
        description:
          "Returns a list of available tools with their descriptions.",
      },
    ];

    const toolsList = tools
      .map((t) => `- ${t.name}: ${t.description}`)
      .join("\n");

    return {
      status: "success",
      report: `Here are the tools available to this agent:\n\n${toolsList}`,
    };
  },
});

export const HelpAgent = new LlmAgent({
  name: "help_agent",
  model: new OllamaModel("gpt-oss:120b-cloud", "https://ollama.com"),
  description: "An agent that provides help and lists its available tools.",
  instruction: `You are a helpful assistant.
If the user asks what you can do, or types "/help", or types "/ayuda", you MUST use the 'get_help' tool to respond with the list of tools.
Otherwise, use the available tools as appropriate or chat normally.`,
  tools: [simpleEcho, getHelp],
});
