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

const viewSourceCode = new FunctionTool({
  name: "view_source_code",
  description: "Shows the source code asked by the user",
  parameters: z.object({
    definition: z
      .string()
      .describe("The kind of source code the user wants to see."),
  }),
  execute: ({ definition }) => {
    return {
      status: "success",
      report: `\`\`\`sourcecode\n${definition}\n\`\`\``,
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
        "timeline",
      ])
      .describe("The type of diagram to create."),
    definition: z.string().describe("The mermaid diagram definition."),
  }),
  execute: ({ definition }) => {
    return {
      status: "success",
      report: `\`\`\`mermaid\n${definition}\n\`\`\``,
    };
  },
});

export const rootAgent = new LlmAgent({
  name: "agent1",
  // model: "gemini-2.5-flash",
  model: new OllamaModel("qwen3:0.6b", "http://localhost:11434"),
  // model: new OllamaModel("qwen3-coder-next:cloud", "https://ollama.com"),
  // model: new OllamaModel("gpt-oss:120b-cloud", "https://ollama.com"),
  description:
    "Agent with three function tools: get_current_time, create_mermaid_diagram and view_source_code. It retrieves the current time, creates mermaid diagrams and visualizes source code.",
  instruction: `You are a helpful assistant.
                If the user ask for the time in a city, Use the 'get_current_time' tool for this purpose.
                If the user asks for a diagram or visual representation, use the 'create_mermaid_diagram' tool.
                If the user asks to view source code, use the 'view_source_code' tool.`,
  tools: [getCurrentTime, createMermaidDiagram, viewSourceCode],
});
