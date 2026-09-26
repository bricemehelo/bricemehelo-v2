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
            {messages.map((message,index)=>(
                <li
                key={index}
            className={
              message.role === "user"
                ? "self-end rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-50 dark:text-black"
                : "self-start rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                }
                >
                    {message.content}
                </li>
            ))}
        </ul>
    </div>
}
