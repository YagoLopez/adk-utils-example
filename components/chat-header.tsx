"use client";

import { Bot } from "lucide-react";

interface ChatHeaderProps {
  messageCount: number;
}

export function ChatHeader({ messageCount }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-center px-6 py-5">
      <div className="flex items-center gap-2 rounded-full bg-glass/80 px-5 py-2.5 backdrop-blur-xl border border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent">
          <Bot className="h-4 w-4 text-accent-foreground" />
        </div>
        <h1 className="text-sm font-semibold text-foreground font-sans">
          ADK Agent
        </h1>
        {messageCount > 0 && (
          <span className="ml-1 rounded-full bg-glass-light px-2.5 py-0.5 text-xs text-muted-foreground font-mono">
            {messageCount}
          </span>
        )}
      </div>
    </header>
  );
}
