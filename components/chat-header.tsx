"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { suggestions, AGENT_MODEL } from "@/lib/constants";

interface ChatHeaderProps {
  messageCount: number;
  onSuggestionClick: (text: string) => void;
  onReset: () => void;
}

export function ChatHeader({
  messageCount,
  onSuggestionClick,
  onReset,
}: ChatHeaderProps) {
  return (
    <header className="relative flex items-center justify-between bg-blue-600 text-white px-6 py-3">
      <button
        type="button"
        onClick={onReset}
        disabled={messageCount === 0}
        className={`flex items-center gap-3 py-1.5 rounded-lg transition-all text-left focus:outline-none -ml-3 ${
          messageCount > 0
            ? "hover:bg-white/20 hover:text-white cursor-pointer"
            : "cursor-default"
        }`}
        aria-label="Reset conversation"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Bot className="h-5 w-5 text-accent-foreground" />
        </div>
        <div className="pr-4">
          <h1 className="text-sm font-semibold text-foreground font-sans inherit-color">
            ADK Agent
          </h1>
          <p className="text-xs text-muted-foreground font-sans">
            Powered by {AGENT_MODEL}
          </p>
        </div>
      </button>

      {messageCount > 0 && (
        <div className="flex items-center gap-2 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
          <TooltipProvider>
            {suggestions.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onSuggestionClick(item.prompt)}
                    className="flex items-center gap-2 h-8 px-3 text-xs cursor-pointer transition-all hover:bg-white/20 hover:text-white border-0"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{item.info}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      )}

      {messageCount > 0 && (
        <span className="hidden sm:inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground font-mono">
          {messageCount} {messageCount === 1 ? "message" : "messages"}
        </span>
      )}
    </header>
  );
}
