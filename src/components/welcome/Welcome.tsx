"use client";

import React, { useEffect, useRef, useState } from "react";

import { BonVivantFont } from "@/style/fonts";
import Flex from "../Flex";
import Image from "next/image";
import ScrollArrow from "../../../public/scroll_arrow.svg";
import SlideUp from "../SlideUp";
import Text from "../Text";
import { useInterval } from "@/hooks/useInterval";

const TITLE = ["THE", "WEDDING", "OF", "BYENGSUP", "AND", "HEEYEON"];

const Welcome = ({
  className,
  onNext
}: {
  className?: string;
  onNext: () => void;
}) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 1. 컴포넌트가 로드되면 바로 텍스트 애니메이션 시작 트리거를 켭니다.
  useEffect(() => {
    setStartTransition(true);
  }, []);

  // 2. 이미지 로드 체크
  useEffect(() => {
    if (!imageRef.current) return;
    imageRef.current.complete && setImageLoaded(true);
  }, [imageRef]);

  // 3. 타이틀 텍스트 순차 등장 타이머
  useInterval(() => {
    if (
      !startTransition ||
      transitionIds.length > TITLE.length ||
      !imageLoaded
    ) {
      return;
    }
    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 50);

  // 4. 하단 서브 텍스트 및 화살표 등장 타이머
  useEffect(() => {
    if (!startTransition || !imageLoaded) return;

    const timeout = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 500);

    const timeout2 = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [startTransition, imageLoaded]);

  // 5. 클릭 시 페이드아웃 및 닫기 처리
  useEffect(() => {
    if (visible) return;

    const timeoutId = setTimeout(() => {
      setHidden(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible, imageLoaded]);

  useEffect(() => {
    if (hidden) {
      onNext();
    }
  }, [hidden, onNext]);

  if (hidden) return null;

  return (
    <div
      ref={ref}
      onClick={() => setVisible(false)}
      onTouchMove={(e) => e.preventDefault()}
      style={{ 
        height: "100svh", 
        transition: "opacity 1s",
        touchAction: "none"
      }}
      className={`relative bg-white w-full flex flex-col justify-between overflow-hidden ${className} ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        ref={imageRef}
        className="w-full absolute bottom-0 left-0"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
        }}
        alt="wedding"
        src="/welcome/intro.JPEG"
        width={860}
        height={1864}
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
      
      <Flex className={`mt-44pxr z-10`}>
        {TITLE.map((text, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Text
              key={index}
              display="block"
              className={`pt-10pxr text-50pxr leading-42pxr h-42pxr medium:text-55pxr medium:leading-48pxr medium:h-48pxr regular:text-60pxr regular:leading-54pxr regular:h-54pxr large:text-66pxr large:leading-66pxr large:h-66pxr  ${BonVivantFont.className}`}
            >
              {text}
            </Text>
          </SlideUp>
        ))}
        
        {/* [수정 부분] 본식 및 사전 피로연 구분 안내 정보 박스 */}
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Flex 
            className={`text-13pxr leading-16pxr mt-16pxr 
              bg-white/70 backdrop-blur-sm 
              px-16pxr py-14pxr rounded-12pxr max-w-fit gap-y-10pxr`}
          >
            {/* 사전 피로연 정보 */}
            <div>
              <Text display="inline-block" className="font-bold text-black border border-black/30 rounded-4pxr px-4pxr py-1pxr text-11pxr mr-6pxr vertical-middle">사전 피로연</Text>
              <Text display="block" className="mt-4pxr font-semibold text-black">2026.08.15, SATURDAY 12:00</Text>
              <Text display="block" className="text-neutral-700 text-12pxr">마레몬스호텔</Text>
            </div>

            {/* 선 구분선 */}
            <div className="w-full border-t border-black/10 my-2pxr" />

            {/* 본식 정보 */}
            <div>
              <Text display="inline-block" className="font-bold text-neutral-600 border border-neutral-400 rounded-4pxr px-4pxr py-1pxr text-11pxr mr-6pxr vertical-middle">본식</Text>
              <Text display="block" className="mt-4pxr font-semibold text-black">2026.09.05, SATURDAY 11:00</Text>
              <Text display="block" className="text-neutral-700 text-12pxr">웨딩스퀘어</Text>
            </div>
          </Flex>
        </SlideUp>
      </Flex>
      
      <SlideUp
        show={transitionIds.includes(TITLE.length + 1)}
        className=" mb-40pxr cursor-pointer mx-auto z-10"
      >
        <ScrollArrow className="flex-none mx-5pxr" />
      </SlideUp>
    </div>
  );
};

export default Welcome;
