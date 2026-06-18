"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Address from "./Address";
import Image from "next/image";
import Navigations from "./Navigations";
// RollingBanner 임포트 제거됨
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["", "LOCATION", " ", " "];
const AddressSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const handleTransition = useCallback(() => {
    // 순차적 화면 표시 로직
    setTimeout(() => {
      setTransitionIds((prev) => (prev.length === 0 ? [0, 1, 2, 3] : prev));
    }, 0);

    setTimeout(() => {
      intervalId.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === TITLE.length + 3) {
            clearInterval(intervalId.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 50);
    }, 200);

    setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 500);

    setTimeout(() => {
      setTransitionIds((prev) =>
        prev.concat([prev.length, prev.length + 1, prev.length + 2])
      );
    }, 700);
  }, []);

  useIsInView(ref, handleTransition);

  useEffect(() => {
    if (transitionIds.length > TITLE.length + 6) {
      clearInterval(intervalId.current!);
      intervalId.current = null;
    }
  }, [transitionIds]);

  return (
    <>
      <section ref={ref} id="address-section" className="w-full px-24pxr">
        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Title>{title}</Title>
          </SlideUp>
        ))}
        <Spacing size={10} />
        
        {/* 주소 및 교통 안내 섹션 */}
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Address
            title="웨딩스퀘어 강변"
            desc={`서울 광진구 광나루로 56길 85, 4층 아모르홀\n02.3424.7000`}
          />
        </SlideUp>
        <Spacing size={20} />
        
        <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
          <Address
            title="자가용 이용 시"
            desc="네비게이션 검색 - 강변 테크노마트 (2시간 무료)"
          />
        </SlideUp>
        <Spacing size={20} />
        
        <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
          <Address
            title="지하철 이용 시"
            desc="지하철 2호선 강변역(강변테크노마트 판매동 B1 연결)"
          />
        </SlideUp>
        <Spacing size={20} />
        
        <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
          <Text
            display="block"
            className="w-full p-10pxr text-12pxr leading-22pxr bg-[#F4F4F4] text-[#474747] whitespace-pre-wrap"
          >
            {"•지하철 이용 : 2호선 강변역 1번 또는 2번 출구 방향으로 나오면 테크노마트 지하 1층과 바로 연결됩니다.\n•자가용 이용 : 지하 3층 또는 지하 4층의 100번대 구역에 주차하면 웨딩홀 전용 엘리베이터와 가장 가깝습니다."}
          </Text>
        </SlideUp>
        <Spacing size={20} />
        
        {/* 지도 및 네비게이션 섹션 */}
        <SlideUp id="map" show={transitionIds.includes(TITLE.length + 4)}>
          <Image
            quality={100}
            src={"/location.PNG"}
            alt="map"
            width={382}
            height={245}
            className="w-full"
          />
        </SlideUp>

        <Spacing size={20} />
        <SlideUp id="" show={transitionIds.includes(TITLE.length + 5)}>
          <Navigations />
        </SlideUp>
      </section>
      
      {/* RollingBanner 및 하단 여백 제거 완료 */}
    </>
  );
};

export default AddressSection;
