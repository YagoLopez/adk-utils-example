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

  const { messages, sendMessage, status } = useChat({ transport });

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

  const handleSuggestionClick = (text: string) => {
    sendMessage({ text });
  };

  return (
    <div className="relative flex h-dvh flex-col font-sans">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/forest-bg.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex h-dvh flex-col">
        <ChatHeader messageCount={messages.length} />

        <main
          ref={scrollRef}
          className="chat-scroll flex flex-1 flex-col overflow-y-auto"
        >
          {messages.length === 0 ? (
            <ChatEmptyState
              onSuggestionClick={handleSuggestionClick}
              input={input}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {status === "submitted" && <ChatTypingIndicator />}
            </div>
          )}
        </main>

        {messages.length > 0 && (
          <ChatInput
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        {/* Footer */}
        <footer className="relative z-10 pb-4 pt-2 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-foreground/50 font-sans">
            <a href="#" className="hover:text-foreground/80 transition-colors">Privacy Policy</a>
            <span>{"&bull;"}</span>
            <a href="#" className="hover:text-foreground/80 transition-colors">Terms & Conditions</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
