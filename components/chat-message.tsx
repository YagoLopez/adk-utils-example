"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
import { Streamdown } from "streamdown";
import { createCodePlugin } from "@streamdown/code";
import { createMermaidPlugin } from "@streamdown/mermaid";

const code = createCodePlugin({
  themes: ["vitesse-light", "vitesse-dark"],
});

const mermaid = createMermaidPlugin({
  config: {
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      darkMode: true,
      background: "#282a36",

      // Main colors
      primaryColor: "#44475a", // Node background (Dracula Selection)
      primaryTextColor: "#f8f8f2", // Node text (White)
      primaryBorderColor: "#bd93f9", // Node border (Purple)

      lineColor: "#f8f8f2", // Arrows/Lines (White)

      secondaryColor: "#ff79c6", // Pink
      secondaryTextColor: "#282a36", // Dark text on Pink
      secondaryBorderColor: "#ff79c6",

      tertiaryColor: "#8be9fd", // Cyan
      tertiaryTextColor: "#282a36", // Dark text on Cyan
      tertiaryBorderColor: "#8be9fd",

      // Specific overrides
      mainBkg: "#282a36",
      nodeBorder: "#bd93f9",
      clusterBkg: "#282a36",
      clusterBorder: "#bd93f9",
      defaultLinkColor: "#f8f8f2",
      fontFamily: "sans-serif",

      // Edges
      edgeLabelBackground: "#ff79c6", // Pink background for labels
      // Note: Mermaid might use secondaryTextColor for edge labels if using secondaryColor, or textColor
    },
  },
});

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const hasRenderableContent = message.parts.some((part) => {
    if (part.type === "text") {
      return part.text.trim().length > 0;
    }
    return part.type.startsWith("tool-");
  });

  if (!hasRenderableContent) {
    return null;
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isUser ? "bg-muted" : "bg-accent"}`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-accent-foreground" />
        )}
      </div>
      <div
        className={`flex min-w-0 flex-col gap-1 max-w-[100%] ${isUser ? "items-end" : "items-start"}`}
      >
        <span
          className={`flex items-center text-xs text-muted-foreground font-sans justify-end`}
        >
          {isUser ? "You" : "Agent"}
        </span>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed font-sans ${isUser
              ? "rounded-tr-sm bg-accent text-accent-foreground border border-zinc-400"
              : "rounded-tl-sm bg-card text-card-foreground border border-zinc-700"
            }`}
        >
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return (
                <div key={index} className="streamdown-content w-full min-w-0">
                  <Streamdown
                    plugins={{ code, mermaid }}
                  // shikiTheme={["dracula", "dracula"]}
                  >
                    {part.text}
                  </Streamdown>
                </div>
              );
            }
            if (part.type.startsWith("tool-")) {
              const toolName = part.type.slice(5);
              const output = "output" in part ? part.output : null;

              return (
                <div
                  key={index}
                  className="mt-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground font-mono"
                >
                  <span className="font-semibold text-foreground">Tool: </span>
                  {toolName}
                  {output != null && (
                    <div className="mt-1 text-foreground">
                      {JSON.stringify(output, null, 2)}
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
