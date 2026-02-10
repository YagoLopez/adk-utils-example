// todo: allow agent and model configuration
// todo: change icons in empty state
// todo: github actions and tests
// todo: detect tool response

"use client";

import { useState, useRef } from "react";
import { useRateLimitedCallback } from "@tanstack/react-pacer";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatHeader } from "@/components/chat-header";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { ChatEmptyState } from "@/components/chat-empty-state";
import { ChatTypingIndicator } from "@/components/chat-typing-indicator";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";

const LIMIT = 20;
const ONE_HOUR_IN_MS = 60 * 60 * 1000;

const transport = new DefaultChatTransport({ api: "/api/genai-agent" });

export default function Home() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, sendMessage, status } = useChat({ transport });
  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useScrollToBottom(scrollRef, [messages, status]);

  const sendUserMessage = useRateLimitedCallback(
    (text: string, clearInput: boolean) => {
      sendMessage({ text });
      if (clearInput) setInput("");
    },
    {
      limit: LIMIT,
      window: ONE_HOUR_IN_MS,
      onReject: () => {
        alert(
          `Rate limit exceeded. You can only send ${LIMIT} messages per hour.`,
        );
      },
    },
  );

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    sendUserMessage(input, true);
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  const handleSuggestionClick = (text: string) => {
    sendUserMessage(text, false);
  };

  const handleInfoClick = () => {
    sendUserMessage("What agent tools do you have?", false);
  };

  return (
    <div className="flex h-dvh flex-col bg-background font-sans">
      <ChatHeader messageCount={messages.length} />

      <main
        ref={scrollRef}
        className="chat-scroll flex flex-1 flex-col overflow-y-auto"
      >
        {messages.length === 0 ? (
          <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div>{isLoading && <ChatTypingIndicator />}</div>
          </div>
        )}
      </main>

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={handleInfoClick}
        isResetDisabled={messages.length === 0}
        isLoading={isLoading}
      />
    </div>
  );
}
