"use client";

import { Bot } from "lucide-react";

export function ChatTypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
        <Bot className="h-4 w-4 text-accent-foreground" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-blink" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-blink" style={{ animationDelay: "200ms" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-blink" style={{ animationDelay: "400ms" }} />
      </div>
    </div>
  );
}
