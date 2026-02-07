"use client";

import { Bot, ArrowUp } from "lucide-react";

interface ChatEmptyStateProps {
  onSuggestionClick: (text: string) => void;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const suggestions = [
  "What time is it in Tokyo?",
  "Tell me the time in New York",
  "What can you help me with?",
  "Get current time worldwide",
];

export function ChatEmptyState({
  onSuggestionClick,
  input,
  onInputChange,
  onSubmit,
  isLoading,
}: ChatEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      {/* Glass card */}
      <div className="w-full max-w-xl rounded-2xl border border-border bg-glass/70 p-6 backdrop-blur-2xl shadow-2xl">
        {/* Greeting */}
        <div className="flex items-center gap-2 mb-1">
          <Bot className="h-5 w-5 text-accent" />
          <span className="text-sm text-muted-foreground font-sans">
            Hello!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-foreground font-sans text-balance mb-5">
          What can I help you today?
        </h2>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mb-3"
        >
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
              placeholder="Message the agent..."
              disabled={isLoading}
              rows={1}
              className="w-full resize-none rounded-xl border border-border bg-glass-light px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-ring backdrop-blur-sm disabled:opacity-50 font-sans"
              style={{
                minHeight: "48px",
                maxHeight: "120px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Model label */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-sans">
            ADK Agent
          </span>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {suggestions.map((text) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            className="rounded-full border border-border bg-glass/60 px-4 py-2 text-xs font-medium text-foreground/90 backdrop-blur-xl transition-all hover:bg-glass-light hover:border-foreground/20 font-sans"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
