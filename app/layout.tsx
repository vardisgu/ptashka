import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ранняя пташка · Ясный · Мелок",
  description:
    "Три места одной команды в Казани: кофейня «Ранняя пташка», батч-бар «Ясный» и винный бар «Мелок».",
};

export const viewport: Viewport = {
  themeColor: "#fcfafc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${mono.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
