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
  // (카카오톡 브라우저의 뷰포트 오작동을 방지하기 위해 useIsInView 대신 useEffect 사용)
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
  }, 100);

  // 4. 하단 서브 텍스트 및 화살표 등장 타이머
  useEffect(() => {
    if (!startTransition || !imageLoaded) return;

    const timeout = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 1800);

    const timeout2 = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 3000);

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
    }, 1100);

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
      // [핵심 변경] 사용자가 터치해서 스크롤(스와이프)하는 동작을 원천 차단합니다.
      onTouchMove={(e) => e.preventDefault()}
      style={{ 
        height: "100svh", 
        transition: "opacity 1s",
        touchAction: "none" // CSS에서도 터치 액션을 완전히 막아 화면을 고정합니다.
      }}
      className={`relative bg-white w-full flex flex-col justify-between overflow-hidden ${className} ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 윗부분을 자연스럽게 흐리게 만드는 mask-image 스타일 적용 */}
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
        {/* 기존 코드의 이 부분을 찾아서 아래처럼 변경해주세요 */}
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Flex 
            className={`text-15pxr leading-18pxr mt-16pxr 
              bg-white/60 backdrop-blur-sm 
              px-16pxr py-12pxr rounded-12pxr max-w-fit`}
          >
            <Text display="block" className="text-black">2026.09.05, SATURDAY 11:00</Text>
            <Text display="block" className="mt-8pxr text-black">
              WEDDINGSQUARE
            </Text>
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
