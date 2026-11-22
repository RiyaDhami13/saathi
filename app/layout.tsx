import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Sudur Saathi",
  description:
    "Plain-language help with prescriptions and nearby care in Kanchanpur and Kailali.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ne">
      <body className="bg-white text-neutral-950 antialiased">
        <AppProvider>
          <TopBar />
          <main className="mx-auto w-full max-w-3xl px-4 py-6">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}