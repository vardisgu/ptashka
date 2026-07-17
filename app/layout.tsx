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
  // Режим «на экран Домой»: запускается полноэкранно, фото уходит под чёлку
  appleWebApp: {
    capable: true,
    title: "Пташка · Ясный · Мелок",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  // theme-color не задаём: белый красил зону статус-бара на iOS и создавал
  // белую полосу над фото. Без него контент показывается под чёлкой.
  viewportFit: "cover",
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
