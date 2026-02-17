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
      "Give me a simple code example of javascript closure less than 20 lines long",
    info: "Shows a code example of a javascript closure.",
  },
  {
    icon: BarChart,
    label: "Pie Chart",
    prompt:
      "Create an example of pie diagram",
    info: "Shows an example of a pie chart diagram.",
  },
];

export const LIMIT = 20;
export const ONE_HOUR_IN_MS = 60 * 60 * 1000;
