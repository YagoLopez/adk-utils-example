"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";

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
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isUser ? "bg-muted" : "bg-accent"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-accent-foreground" />
        )}
      </div>
      <div className={`flex min-w-0 flex-col gap-1 max-w-[100%]`}>
        <span className="flex items-center text-xs text-muted-foreground font-sans">
          {isUser ? "You" : "Agent"}
        </span>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed font-sans ${
            isUser
              ? "rounded-tr-sm bg-accent text-accent-foreground"
              : "rounded-tl-sm bg-card text-card-foreground border border-border"
          }`}
        >
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return (
                <div key={index} className="streamdown-content w-full min-w-0">
                  <Streamdown plugins={{ code }}>{part.text}</Streamdown>
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
