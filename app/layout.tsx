import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudur Sathi",
  description: "Sudur Sathi web application",
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