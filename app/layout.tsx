
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saathi AI",
  description: "Your AI-powered study assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
