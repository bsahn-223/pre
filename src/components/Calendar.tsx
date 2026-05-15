import React, { ReactNode } from "react";

import SlideUp from "./SlideUp";
import Text from "./Text";

const Calendar = ({ children }: { children: ReactNode }) => {
  return <div className="w-full grid grid-cols-7 gap-y-12pxr">{children}</div>;
};

// 1. Calendar.Days 컴포넌트에 기입용 기명 함수 스타일 적용
const CalendarDays = () => {
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

// 2. Calendar.Dates 컴포넌트에 기입용 기명 함수 스타일 적용
const CalendarDates = ({
  startDate,
  endDate,
  activeDate,
  startDayOffset = 0
}: {
  startDate: number;
  endDate: number;
  activeDate: number;
  startDayOffset?: number;
}) => {
  const emptySpaces = Array.from({ length: startDayOffset });
  const totalDates = Array.from({ length: endDate - startDate + 1 });

  return (
    <>
      {emptySpaces.map((_, index) => (
        <div key={`empty-${index}`} className="w-full" />
      ))}

      {totalDates.map((_, i) => {
        const currentDate = startDate + i;
        const isActive = currentDate === activeDate;
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

// 서브 컴포넌트 등록 및 명시적 displayName 선언 (ESLint 에러 해결)
Calendar.Days = CalendarDays;
Calendar.Days.displayName = "Calendar.Days";

Calendar.Dates = CalendarDates;
Calendar.Dates.displayName = "Calendar.Dates";

export default Calendar;
