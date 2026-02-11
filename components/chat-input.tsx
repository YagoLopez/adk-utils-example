"use client";

import { ArrowRight, Github, Home } from "lucide-react";
import { useFocusOnLoad } from "@/hooks/use-focus-on-load";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  onInfoClick: () => void;
  isResetDisabled: boolean;
  isLoading: boolean;
}

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onReset,
  isResetDisabled,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useFocusOnLoad(isLoading);

  return (
    <TooltipProvider>
      <div className="border-t border-zinc-700 bg-card px-4 py-4 sm:px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mx-auto flex max-w-3xl items-end gap-3"
        >
          <div className="relative flex-1">
            <textarea
              name="message"
              ref={textareaRef}
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
              className="w-full resize-none rounded-xl border border-zinc-700 bg-card mt-4 px-4 py-3 pr-[128px] text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 font-sans"
              style={{
                minHeight: "48px",
                maxHeight: "160px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 160)}px`;
              }}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute bottom-[14px] right-[45px] flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Send message"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Send message</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onReset}
                  disabled={isResetDisabled || isLoading}
                  className="absolute bottom-[14px] right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Reset conversation"
                >
                  <Home className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Reset conversation</TooltipContent>
            </Tooltip>
          </div>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground font-sans flex items-center justify-center gap-1.5">
          <Github className="h-3 w-3" />
          <a
            href="https://github.com/YagoLopez/adk-utils-example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </TooltipProvider>
  );
}
