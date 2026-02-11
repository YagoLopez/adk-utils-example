"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { suggestions } from "@/lib/constants";


interface ChatHeaderProps {
  messageCount: number;
  onSuggestionClick: (text: string) => void;
}

export function ChatHeader({ messageCount, onSuggestionClick }: ChatHeaderProps) {
  return (
    <header className="relative flex items-center justify-between bg-blue-600 text-white px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Bot className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground font-sans">
            ADK Agent
          </h1>
          <p className="text-xs text-muted-foreground font-sans">
            Powered by Ollama Cloud
          </p>
        </div>
      </div>

      {messageCount > 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
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
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground font-mono">
          {messageCount} {messageCount === 1 ? "message" : "messages"}
        </span>
      )}
    </header>
  );
}
