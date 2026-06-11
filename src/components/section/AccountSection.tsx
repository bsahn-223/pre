"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Account from "./Account";
import Arcodion from "../Arcodion";
import FooterSection from "./FooterSection";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["GIFT", "FOR", "WEDDING", "CEREMONY"];

const AccountSection = ({ onDone }: { onDone: () => void }) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 1. 글자 및 아코디언 상자들이 차례대로 타타탁 켜지는 타이머 (50ms 간격으로 매우 빠르게)
  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length + 3) return;

    setTransitionIds((prev) => {
      // 순차적으로 다음 인덱스를 안전하게 추가
      if (prev.includes(prev.length)) return prev;
      return prev.concat(prev.length);
    });
  }, 50);

  // 뷰포트에 감지되면 애니메이션 시작
  useIsInView(ref, () => setStartTransition(true));

  // 2. 애니메이션이 모두 끝난 후 부모 컴포넌트에 알림
  useEffect(() => {
    if (transitionIds.length >= TITLE.length + 3) {
      onDone();
    }
  }, [transitionIds, onDone]);

  return (
    <>
      <section ref={ref} id="account-section" className="w-full px-24pxr">
        {TITLE.map((title, i) => (
          <SlideUp key={title} show={transitionIds.includes(i)}>
            <Title>{title}</Title>
          </SlideUp>
        ))}
        <Spacing size={20} />
        
        {/* 신랑측 아코디언 (인덱스 4) */}
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-black">
              <Text>신랑측 계좌번호</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              {/* 신랑 본인 */}
              <Account
                name="안병섭"
                bankInfo={{
                  bankName: "토스뱅크",
                  accountNumber: "100166342894"
                }}
              />
              <Spacing size={12} />
              {/* 신랑 아버님 계좌 */}
              <Account
                name="아버지 안의준"
                bankInfo={{
                  bankName: "농협",
                  accountNumber: "32705152020476"
                }}
              />
              <Spacing size={12} />
              {/* 신랑 어머님 계좌 */}
              <Account
                name="어머니 유미향"
                bankInfo={{
                  bankName: "농협",
                  accountNumber: "33105051029611"
                }}
              />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
        
        <Spacing size={20} />
        
        {/* 신부측 아코디언 (인덱스 5) */}
        <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-black">
              <Text>신부측 계좌번호</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              {/* 신부 본인 */}
              <Account
                name="안희연"
                bankInfo={{
                  bankName: "토스뱅크",
                  accountNumber: "100062438989"
                }}
              />
              <Spacing size={12} />
              {/* 신부 아버님 계좌 */}
              <Account
                name="아버지 안창덕"
                bankInfo={{
                  bankName: "농협",
                  accountNumber: "23512031480"
                }}
              />
              <Spacing size={12} />
              {/* 신부 어머님 계좌 */}
              <Account
                name="어머니 김영미"
                bankInfo={{
                  bankName: "농협",
                  accountNumber: "31701456061441"
                }}
              />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
      </section>
      
      <Spacing size={100} />
      
      {/* 푸터 섹션 (인덱스 6) */}
      <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
        <FooterSection />
      </SlideUp>
    </>
  );
};

export default AccountSection;
