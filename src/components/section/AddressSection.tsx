"use client";

import React, { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["WEDDING", "CALENDAR"];

export default function CalendarSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);

  // 애니메이션 타이밍 로직
  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;
    setTransitionIds((prev) => prev.concat(prev.length));
  }, 50);

  useInterval(() => {
    if (!startTransition || !callTimeout || transitionIds.length >= TITLE.length + 5) return;
    setTransitionIds((prev) => prev.concat(prev.length));
  }, 50);

  useEffect(() => {
    if (!startTransition) return;
    setTimeout(() => setCallTimeout(true), 1000);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.length === TITLE.length + 2) setStartTransition(false);
  }, [transitionIds]);

  useIsInView(ref, () => setStartTransition(true));

  return (
    <section id="calendar-section" ref={ref} className="w-full px-24pxr">
      {TITLE.map((title, index) => (
        <SlideUp key={index} show={transitionIds.includes(index)}>
          <Title key={title} display="block">
            {title}
          </Title>
        </SlideUp>
      ))}

      <Spacing size={25} />

      {/* 1. 8월 사전 피로연 달력 세트 (인덱스 2) */}
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex justify-between items-end pb-12pxr border-b border-black/5 mb-12pxr">
          <Text display="block" className="text-[20px] font-bold text-black tracking-widest">
            08 <span className="text-[13px] font-normal text-neutral-500 ml-4pxr">사전 피로연</span>
          </Text>
          <div className="text-right">
            <Text display="block" className="text-[12px] text-neutral-500 font-medium">
              15일 토요일 PM 12:00
            </Text>
            <Text display="block" className="text-[11px] text-neutral-400 mt-2pxr">
              속초 마레몬스 호텔
            </Text>
          </div>
        </div>
        <Calendar>
          <Calendar.Days />
          <Calendar.Dates startDate={1} endDate={31} activeDate={15} startDayOffset={6} />
        </Calendar>
      </SlideUp>

      <Spacing size={50} />

      {/* 2. 9월 본식 달력 세트 (인덱스 3) */}
      <SlideUp show={transitionIds.includes(TITLE.length + 1)} className="w-full">
        <div className="w-full flex justify-between items-end pb-12pxr border-b border-black/5 mb-12pxr">
          <Text display="block" className="text-[20px] font-bold text-black tracking-widest">
            09 <span className="text-[13px] font-normal text-neutral-500 ml-4pxr">본식</span>
          </Text>
          <div className="text-right">
            <Text display="block" className="text-[12px] text-neutral-500 font-medium">
              5일 토요일 AM 11:00
            </Text>
            <Text display="block" className="text-[11px] text-neutral-400 mt-2pxr">
              서울 강변역 웨딩스퀘어
            </Text>
          </div>
        </div>
        <Calendar>
          <Calendar.Days />
          <Calendar.Dates startDate={1} endDate={30} activeDate={5} startDayOffset={2} />
        </Calendar>
      </SlideUp>
    </section>
  );
}
