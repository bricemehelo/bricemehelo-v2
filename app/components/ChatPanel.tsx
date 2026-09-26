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

  return(
    <div className="flex h-full w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <ul className="flex flex-1 flex-col gap-3 overflow-y-auto">
            
        </ul>
    </div>
}
