import "./globals.css";

import type { Metadata, Viewport } from "next";

import { PretendardFont } from "@/style/fonts";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const metadata: Metadata = {
  title: "병섭, 희연 결혼합니다♡",
  description: "9월 5일 토요일 오전 11시 웨딩스퀘어 강변",

  openGraph: {
    type: "website",

    title: "병섭, 희연 결혼합니다♡",
    locale: "ko_KR",
    description: "9월 5일 토요일 오전 11시 웨딩스퀘어 강변",
    images: [
      {
        url: "https://qudtjq.duckdns.org/welcome_wedding.JPEG", // Must be an absolute URL
        width: 720,
        height: 720
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={
          PretendardFont.className + " text-black font-normal relative"
        }
      >
        <ToastProvider>{children}</ToastProvider>

        <div id="portal" className="relative"></div>
      </body>
    </html>
  );
}
