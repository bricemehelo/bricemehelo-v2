import { Metadata } from "next";
import ChatPanel from "./components/ChatPanel";

export const metadata: Metadata = {
  title: "Brice Mehelo — Senior Full Stack Engineer & SaaS Founder",
  description: "Brice Mehelo — AI Engineering & Business Transformation Lab",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="grid flex-1 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 bg-paper px-8 py-24 text-ink md:px-16">
          <h1 className="text-5xl font-light uppercase tracking-tight md:text-7xl">
            Brice Mehelo
          </h1>
          <p className="max-w-md text-lg text-body-text">
            Senior Full Stack Engineer &amp; SaaS Founder
          </p>
        </div>
        <div className="flex items-center justify-center bg-hero-bg px-8 py-24 md:px-16">
          <ChatPanel />
        </div>
      </section>
    </main>
  );
}
