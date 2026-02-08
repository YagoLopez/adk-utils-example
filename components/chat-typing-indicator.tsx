"use client";

export function ChatTypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 mx-2 py-3">
      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-blink" style={{animationDelay: "0ms"}}/>
      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-blink" style={{animationDelay: "200ms"}}/>
      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-blink" style={{animationDelay: "400ms"}}/>
    </div>
  );
}
