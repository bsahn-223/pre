"use client";

import React, { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import SlideUp from "./SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["2026.09.05", "SATURDAY", "AM 11:00"];

// 화살표 함수에서 기명 함수로 변경하여 displayName 에러 해결
export default function CalendarSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);

  // 로직은 기존과 동일하게 유지
  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;
    setTransitionIds((prev) => prev.concat(prev.length));
  }, 200);

  useInterval(() => {
    if (!startTransition || !callTimeout || transitionIds.length >= TITLE.length + 5) return;
    setTransitionIds((prev) => prev.concat(prev.length));
  }, 200);

  useEffect(() => {
    if (!startTransition) return;
    const timer = setTimeout(() => setCallTimeout(true), 1000);
    return () => clearTimeout(timer);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.length === 4) setStartTransition(false);
  }, [transitionIds]);

  useIsInView(ref, () => setStartTransition(true));

  return (
    <section id="calendar-section" ref={ref} className="w-full px-24pxr">
      {TITLE.map((title, index) => (
        <SlideUp key={index} show={transitionIds.includes(index)}>
          <Title key={title} display="block">{title}</Title>
        </SlideUp>
      ))}
      <Spacing size={15} />
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Calendar>
          <Calendar.Days />
          <Calendar.Dates startDate={1} endDate={25} activeDate={5} startDayOffset={2} />
        </Calendar>
      </SlideUp>
    </section>
  );
}
