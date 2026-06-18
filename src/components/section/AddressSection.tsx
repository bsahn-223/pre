"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Address from "./Address";
import Image from "next/image";
import Navigations from "./Navigations";
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
        
        {/* 1. [추가] 사전 피로연 장소 및 교통 안내 */}
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <div className="border border-neutral-200 rounded-12pxr p-16pxr bg-neutral-50/50">
            <div className="flex items-center mb-10pxr">
              <span className="font-bold text-[11px] text-white bg-neutral-800 rounded-4pxr px-6pxr py-2pxr mr-8pxr">사전 피로연</span>
              <span className="font-bold text-[14px] text-black">마레몬스 호텔</span>
            </div>
            <Address
              title="오시는 길"
              desc={`강원특별자치도 속초시 동해대로 3707, 지하 1층 오션홀\n033.630.5000`}
            />
            <Spacing size={12} />
            <Address
              title="자가용 이용 시"
              desc="네비게이션 검색 - 마레몬스 호텔 주차장 (무료 주차 가능)"
            />
          </div>
        </SlideUp>
        <Spacing size={24} />
        
        {/* 2. 본식 장소 및 교통 안내 */}
        <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
          <div className="border border-neutral-200 rounded-12pxr p-16pxr bg-neutral-50/50">
            <div className="flex items-center mb-10pxr">
              <span className="font-bold text-[11px] text-neutral-600 border border-neutral-400 rounded-4pxr px-6pxr py-1pxr mr-8pxr">본식</span>
              <span className="font-bold text-[14px] text-black">웨딩스퀘어 강변</span>
            </div>
            <Address
              title="오시는 길"
              desc={`서울 광진구 광나루로 56길 85, 4층 아모르홀\n02.3424.7000`}
            />
            <Spacing size={12} />
            <Address
              title="지하철 이용 시"
              desc="지하철 2호선 강변역 (강변테크노마트 판매동 B1 직접 연결)"
            />
            <Spacing size={12} />
            <Address
              title="자가용 이용 시"
              desc="네비게이션 검색 - 강변 테크노마트 주차장 (2시간 무료)"
            />
          </div>
        </SlideUp>
        <Spacing size={20} />
        
        {/* 통합 상세 안내문 */}
        <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
          <Text
            display="block"
            className="w-full p-12pxr text-12pxr leading-22pxr bg-[#F4F4F4] text-[#474747] whitespace-pre-wrap rounded-8pxr"
          >
            {"• 사전 피로연 안내\n호텔 정문 주차장을 무료로 이용하실 수 있으며, 지하 1층 오션홀로 바로 오시면 편리합니다.\n\n• 본식 안내\n2호선 강변역 1번 또는 2번 출구 방향 테크노마트 지하 연결 통로를 이용하세요. 자가용 이용 시 지하 3층 또는 4층 100번대 구역에 주차하시면 웨딩홀 전용 엘리베이터와 가장 가깝습니다."}
          </Text>
        </SlideUp>
        <Spacing size={20} />
        
        {/* 지도 이미지 섹션 */}
        <SlideUp id="map" show={transitionIds.includes(TITLE.length + 4)}>
          <Image
            quality={100}
            src={"/location.PNG"}
            alt="map"
            width={382}
            height={245}
            className="w-full rounded-8pxr"
          />
        </SlideUp>

        <Spacing size={20} />
        {/* 내비게이션 앱 연동 버튼 섹션 */}
        <SlideUp id="" show={transitionIds.includes(TITLE.length + 5)}>
          <Navigations />
        </SlideUp>
      </section>
    </>
  );
};

export default AddressSection;
