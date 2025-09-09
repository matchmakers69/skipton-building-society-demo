import { ReactNode } from "react";
import type { Metadata } from "next";
import { Footer, Header } from "@/componets/ui";

export const metadata: Metadata = {
  title: "Skipton Building Society | JSONPlaceholder Blog",
  description: "A demo blog using Next.js v15, ISR, and robust error handling.",
  authors: [
    {
      name: "Przemek Lewtak",
      url: "https://github.com/matchmakers69",
    },
  ],
  creator: "Przemek Lewtak",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow pt-[70px]">{children}</main>
        <Footer />
      </div>
    </>
  );
}
