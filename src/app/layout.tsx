import type { Metadata } from "next";
import "@/styles/globals.css";
import { fontsClassName } from "@/utils";

export const metadata: Metadata = {
  title: "Skipton Building Society | Founded on Fairness",
  description:
    "We&#39;re here to help our members get more from their money, have a home and prepare for the future, with our range of savings, mortgages and financial advice.",
  keywords: [
    "UK mortgages",
    "first time buyer mortgages",
    "buy to let mortgage",
    "savings accounts UK",
    "tax-free savings ISA",
    "lifetime ISA",
    "fixed rate savings",
    "retirement savings plans",
  ],
  authors: [
    {
      name: "Przemek Lewtak",
      url: "https://github.com/matchmakers69",
    },
  ],
  creator: "Przemek Lewtak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${fontsClassName} scroll-touch antialiased`}>
        {children}
      </body>
    </html>
  );
}
