import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WakeOrPay — Wake up. Or pay up.",
  description: "The alarm with real consequences. Set your wake time, pick your punishment. Actually wake up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
