"use client";

import { Bot, Clock, Globe, Sparkles } from "lucide-react";

interface ChatEmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  {
    icon: Clock,
    label: "Agent Tools",
    prompt: "What agent tools do you have?",
  },
  {
    icon: Globe,
    label: "Source Code",
    prompt:
      "Give me a code example of a simple Typescript class less than 20 lines long",
  },
  {
    icon: Sparkles,
    label: "Get started",
    prompt: "What can you help me with?",
  },
];

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
          <Bot className="h-8 w-8 text-accent" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground font-sans text-balance">
            How can I help you today?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-sans text-pretty">
            Ask me anything. I can help you check the time in any city around
            the world.
          </p>
        </div>
      </div>

      <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
        {suggestions.map((item) => (
          <button
            key={item.label}
            onClick={() => onSuggestionClick(item.prompt)}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-accent/50 hover:bg-muted hover:cursor-pointer"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground font-sans">
              {item.label}
            </span>
            <span className="text-xs text-muted-foreground font-sans line-clamp-2">
              {item.prompt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
