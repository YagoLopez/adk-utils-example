import { BarChart, CodeXml, Wrench } from "lucide-react";

export const suggestions = [
  {
    icon: Wrench,
    label: "Agent Tools",
    prompt: "What agent tools do you have?",
    info: "Shows information about the available agent tools.",
  },
  {
    icon: CodeXml,
    label: "Source Code",
    prompt:
      "Give me a code example of a simple Typescript class less than 20 lines long",
    info: "Shows a code example of a simple Typescript class.",
  },
  {
    icon: BarChart,
    label: "Flowchart Diagram",
    prompt:
      "Create an example of flowchart diagram that shows a basic decision‑making process",
    info: "Shows an example of a flowchart diagram.",
  },
];

export const LIMIT = 20;
export const ONE_HOUR_IN_MS = 60 * 60 * 1000;
