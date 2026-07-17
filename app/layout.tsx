import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Ранняя пташка · Ясный · Мелок",
  description:
    "Три места одной команды в Казани: кофейня «Ранняя пташка», батч-бар «Ясный» и винный бар «Мелок».",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
