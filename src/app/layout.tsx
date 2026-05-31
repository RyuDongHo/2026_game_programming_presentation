import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// abcNormal 대체 — DESIGN.md의 권장 fallback (Inter).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Custom Game Engine — Programme Notes",
  description:
    "DX11 2D Game Engine 프로젝트 소개. Subscribe 패턴 + Component-Entity 구조 + Firebase 비동기 로깅.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
