"use client";

import React, { ReactNode, useEffect } from "react";

const KakaoSDK = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🌟 기존 카카오 SDK 로딩 및 init 코드를 완전히 비활성화합니다.
    console.log("Kakao SDK 비활성화 상태 (준비중 처리)");

    // 카카오 버튼 클릭 이벤트를 도중에 가로채서 "준비중" 팝업을 띄우는 안전장치
    const handleCaptureClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 카카오 공유 버튼의 id나 클래스명, 혹은 카카오 단어가 포함된 버튼을 누르면 가로챔
      if (
        target.id?.includes("kakao") || 
        target.closest("[id*='kakao']") || 
        target.textContent?.includes("카카오")
      ) {
        e.preventDefault();
        e.stopPropagation();
        alert("카카오톡 공유 기능은 현재 준비 중입니다.");
      }
    };

    document.addEventListener("click", handleCaptureClick, true);
    return () => document.removeEventListener("click", handleCaptureClick, true);
  }, []);

  return <>{children}</>;
};

export default KakaoSDK;
