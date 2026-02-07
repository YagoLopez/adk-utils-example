"use client";

import { Bot } from "lucide-react";

interface ChatHeaderProps {
  messageCount: number;
}

export function ChatHeader({ messageCount }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Bot className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground font-sans">
            ADK Agent
          </h1>
          <p className="text-xs text-muted-foreground font-sans">
            Powered by Google ADK
          </p>
        </div>
      </div>
      {messageCount > 0 && (
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground font-mono">
          {messageCount} {messageCount === 1 ? "message" : "messages"}
        </span>
      )}
    </header>
  );
}
