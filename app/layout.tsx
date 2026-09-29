import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Brice Mehelo - Senior AI Product Engineer / Senior SaaS Engineer",
  description: "Brice Mehelo — AI Engineering & Business Transformation Lab",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={` ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
