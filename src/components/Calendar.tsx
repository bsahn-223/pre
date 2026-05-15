import React, { ReactNode } from "react";

import SlideUp from "./SlideUp";
import Text from "./Text";

const Calendar = ({ children }: { children: ReactNode }) => {
  return <div className="w-full grid grid-cols-7 gap-y-12pxr">{children}</div>;
};

Calendar.Days = () => {
  return ["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
    <Text
      key={day}
      display="block"
      className={`font-bold first-letter:w-full py-7.5pxr text-center flex items-center justify-center ${
        i === 0 ? "text-[#00AEFF]" : "text-black"
      }`}
    >
      {day}
    </Text>
  ));
};

Calendar.Dates = ({
  startDate,
  endDate,
  activeDate,
  startDayOffset = 0 // 기본값은 0(일요일 시작)으로 설정
}: {
  startDate: number;
  endDate: number;
  activeDate: number;
  startDayOffset?: number; // 부모로부터 시작 요일 오프셋을 받도록 추가
}) => {
  const emptySpaces = Array.from({ length: startDayOffset });
  const totalDates = Array.from({ length: endDate - startDate + 1 });

  return (
    <>
      {/* 1. 부모에게서 전달받은 오프셋만큼 빈 칸을 생성합니다. */}
      {emptySpaces.map((_, index) => (
        <div key={`empty-${index}`} className="w-full" />
      ))}

      {/* 2. 실제 날짜들을 순서대로 렌더링합니다. */}
      {totalDates.map((_, i) => {
        const currentDate = startDate + i;
        const isActive = currentDate === activeDate;
        
        // 전달받은 오프셋을 고려하여 정확한 일요일 위치를 계산합니다.
        const isSunday = (i + startDayOffset) % 7 === 0;

        return (
          <div
            key={i}
            className="w-full text-center flex justify-center items-center"
          >
            <Text
              display="block"
              className={`w-40pxr py-7.5pxr items-center flex justify-center ${
                isActive
                  ? "bg-black font-bold text-[#00AEFF]"
                  : isSunday
                  ? "text-[#00AEFF]"
                  : ""
              }`}
            >
              {currentDate}
            </Text>
          </div>
        );
      })}
    </>
  );
};

export default Calendar;
