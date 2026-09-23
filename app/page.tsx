import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brice Mehelo - Senior AI Product Engineer / Senior Saas Engineer",
  description: "Brice Mehelo — AI Engineering & Business Transformation Lab",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col bg-white dark:bg-black">
        <section className="grid flex-1 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 px-8 py-24 md:px-16">
            <h1 className="text-5xl font-light uppercase tracking-tight text-black dark:text-zinc-50 md:text-7xl">
              Brice Mehelo
            </h1>
            <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
              Software / ai engineer - [online pitch ]
            </p>
          </div>
          <div>{/** TODO:: AI concierge chat panel */}</div>
        </section>
      </main>
    </div>
  );
}
