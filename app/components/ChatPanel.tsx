"use client";
import { useState, type FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hi, I'm Brice's AI concierge. Ask me anything about his work.",
  },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: draft }]);
    setDraft("");
  }

  return (
    <div className="flex h-full w-full max-w-md flex-col gap-4">
      <ul className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {messages.map((message, index) => (
          <li
            key={index}
            className={
              message.role === "user"
                ? "self-end rounded-lg bg-cream px-3 py-2 text-sm text-ink"
                : "self-start rounded-lg bg-cream/10 px-3 py-2 text-sm text-cream/90"
            }
          >
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Ask a question
        </label>
        <input
          id="chat-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a question…"
          className="flex-1 border-none bg-cream/10 px-4 py-3 text-[15.5px] text-cream placeholder:text-cream/50 outline-none"
        />
        <button
          type="submit"
          className="bg-cream px-4 py-2 text-sm text-ink hover:bg-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Send
        </button>
      </form>
    </div>
  );
}
