import { FunctionTool, LlmAgent } from "@google/adk";
import { z } from "zod";
import { OllamaModel } from "@yagolopez/adk-utils";

/* Mock tool implementation */
const getCurrentTime = new FunctionTool({
  name: "get_current_time",
  description: "Returns the current time in a specified city.",
  parameters: z.object({
    city: z
      .string()
      .describe("The name of the city for which to retrieve the current time."),
  }),
  execute: ({ city }) => {
    return {
      status: "success",
      report: `The current time in ${city} is 10:30 AM`,
    };
  },
});

const createMermaidDiagram = new FunctionTool({
  name: "create_mermaid_diagram",
  description: "Creates a mermaid diagram using markdown.",
  parameters: z.object({
    type: z
      .enum([
        "flowchart",
        "sequence",
        "class",
        "state",
        "er",
        "gantt",
        "pie",
        "mindmap",
      ])
      .describe("The type of diagram to create."),
    definition: z
      .string()
      .describe("The mermaid diagram definition."),
  }),
  execute: ({ definition }) => {
    return {
      status: "success",
      report: `\`\`\`mermaid\n${definition}\n\`\`\``,
    };
  },
});

export const rootAgent = new LlmAgent({
  name: "hello_time_agent",
  // model: 'gemini-2.5-flash',
  // model: new OllamaModel('qwen3:0.6b', 'http://localhost:11434'),
  // model: new OllamaModel("qwen3-coder-next:cloud", "https://ollama.com"),
  model: new OllamaModel("gpt-oss:120b-cloud", "https://ollama.com"),
  description: "Tells the current time in a specified city.",
  instruction: `You are a helpful assistant that tells the current time in a city.
                Use the 'getCurrentTime' tool for this purpose.
                If the user asks for a diagram or visual representation, use the 'create_mermaid_diagram' tool.`,
  tools: [getCurrentTime, createMermaidDiagram],
});
