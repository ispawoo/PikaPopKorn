import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import TelegramProvider from '@/lib/telegram/provider';
import { UmamiScript } from '@/lib/umami/UmamiScript';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PikaPopKorn",
  description: "Premium Telegram-native entertainment streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <UmamiScript />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white`}
      >
        <TelegramProvider>
          {children}
        </TelegramProvider>
      </body>
    </html>
  );
}
