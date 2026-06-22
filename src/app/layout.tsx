import "./globals.css";

import type { Metadata, Viewport } from "next";

import { PretendardFont } from "@/style/fonts";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const metadata: Metadata = {
  title: "병섭, 희연 결혼합니다♡",
  description: "9월 5일 토요일 오전 11시 웨딩스퀘어 강변 4층 아모르홀",

  openGraph: {
    type: "website",

    title: "[사전 피로연] 안의준의 장남 *병섭* 결혼합니다♡",
    locale: "ko_KR",
    description: "8월 15일 토요일 오후 12시 속초 마레몬스호텔 지하1층 오션홀",
    images: [
      {
        url: "https://qudtjq.duckdns.org/pre_wedding_r3.png", // Must be an absolute URL
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
