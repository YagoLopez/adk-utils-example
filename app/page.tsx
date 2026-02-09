// todo: rate limiter
// todo: response in markdown
// todo: allow agent and model configuration
// todo: tooltips for buttons
// todo: change icons in empty state
// todo: github actions
// todo: detect tool response

"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatHeader } from "@/components/chat-header";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { ChatEmptyState } from "@/components/chat-empty-state";
import { ChatTypingIndicator } from "@/components/chat-typing-indicator";

const transport = new DefaultChatTransport({ api: "/api/genai-agent" });

export default function Home() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, sendMessage, status } = useChat({ transport });
  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage({ text });
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
          <>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div>{isLoading && <ChatTypingIndicator />}</div>
            </div>
          </>
        )}
      </main>

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isResetDisabled={messages.length === 0}
        isLoading={isLoading}
      />
    </div>
  );
}
