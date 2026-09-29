import { Metadata } from "next";
import ChatPanel from "./components/ChatPanel";

export const metadata: Metadata = {
  title: "Brice Mehelo - AI Product Engineer / Senior Full Stack SaaS Engineer",
  description: "Brice Mehelo — AI Engineering & Business Transformation Lab",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-hero-bg text-cream">
        <nav className="flex items-center justify-between px-8 pt-[30px] text-[11.5px] uppercase tracking-[0.2em] md:px-16">
          <div className="flex items-center gap-[11px]">
            <span className="h-[9px] w-[9px] bg-accent" />
            <span>Brice Mehelo</span>
          </div>
          <div className="hidden gap-[30px] text-cream/70 md:flex">
            <a href="#profile" className="hover:text-accent">
              Profile
            </a>
            <a href="#problems" className="hover:text-accent">
              Problems
            </a>
            <a href="#probono" className="hover:text-accent">
              Pro-Bono Lab
            </a>
            <a href="#speak" className="hover:text-accent">
              Speak
            </a>
            <a href="#contact" className="hover:text-accent">
              Contact
            </a>
          </div>
          <div className="text-cream/70">Lagos, NG · GMT+1</div>
        </nav>

        <div className="px-8 pt-[78px] md:px-16">
          <div className="flex items-baseline justify-between pb-[26px] text-[11.5px] uppercase tracking-[0.2em] text-cream/72">
            <span>§0&nbsp;&nbsp;Introduction</span>
            <span>Available for one engagement — Q4 2026</span>
          </div>
          <h1 className="m-0 text-6xl font-light uppercase leading-[0.82] tracking-[-0.03em] md:text-8xl lg:text-[164px]">
            Brice <br />
            Mehelo
          </h1>
          <div className="flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[600px] text-[27px]">
              AI Product Engineer / Senior Full Stack SaaS Engineer &amp; SaaS
              Founder
            </div>
            <div className="text-[13px] uppercase leading-[1.9] tracking-[0.06em] text-cream/78 md:text-right">
              iZone5 → iHub Connect
              <br />
              Multi-tenant SaaS · Platform architecture
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 px-8 pt-14 pb-8 md:grid-cols-[1fr_1.05fr] md:gap-[72px] md:px-16">
          <div className="pt-2">
            <ChatPanel />
          </div>
          <div className="flex flex-col">
            {/* six-ways-in carousel — next step */}
          </div>
        </div>
      </div>

      <div className="bg-paper px-8 py-[84px] text-ink md:px-16">
        <div className="max-w-[1140px] text-4xl font-light leading-[1.14] tracking-[-0.02em] md:text-5xl">
          Teams and products that scale are built on standards — not quick
          fixes.
        </div>
      </div>
    </main>
  );
}
