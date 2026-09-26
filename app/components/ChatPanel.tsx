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
        <form onSubmit={handleSubmit} className="flex gap-2">
            <label htmlFor="chat-input" className="sr-only">
                Ask a question
            </label>
            <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 dark:placeholder:text-zinc-400"
            />
            <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Send
            </button>
        </form>
    </div>
}
