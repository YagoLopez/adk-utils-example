"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
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
      <div
        className={`flex max-w-[75%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <span className="text-xs text-muted-foreground font-sans">
          {isUser ? "You" : "Agent"}
        </span>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed font-sans backdrop-blur-xl ${
            isUser
              ? "rounded-tr-sm bg-accent text-accent-foreground"
              : "rounded-tl-sm bg-glass/70 text-card-foreground border border-border"
          }`}
        >
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return (
                <span key={index} className="whitespace-pre-wrap">
                  {part.text}
                </span>
              );
            }
            if (part.type === "tool-invocation") {
              return (
                <div
                  key={index}
                  className="mt-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground font-mono"
                >
                  <span className="font-semibold text-foreground">
                    Tool:{" "}
                  </span>
                  {part.toolInvocation.toolName}
                  {part.toolInvocation.state === "output-available" && (
                    <div className="mt-1 text-foreground">
                      {JSON.stringify(part.toolInvocation.output, null, 2)}
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
