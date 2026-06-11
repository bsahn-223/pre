"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import ArrowBottom from "../../public/arrow_bottom.svg";
import ArrowTop from "../../public/arrow_top.svg";
import Flex from "./Flex";

const ArcodionContext = createContext({ visible: false, toggle: () => {} });

const useArcodion = () => {
  const context = useContext(ArcodionContext);

  if (!context) {
    throw new Error("useArcodion must be used within a ArcodionProvider");
  }
  return context;
};

const Arcodion = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => setVisible((prev) => !prev), []);

  return (
    <ArcodionContext.Provider value={{ visible, toggle }}>
      {children}
    </ArcodionContext.Provider>
  );
};

const Header = ({
  children,
  className
}: {
  children: ReactNode;
  className: string;
}) => {
  const { toggle } = useArcodion();

  return (
    <Flex
      direction="row"
      justify="space-between"
      onClick={toggle}
      className={className}
    >
      {children}
    </Flex>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  const { visible } = useArcodion();
  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const handleHeight = () => {
    if (!ref.current) {
      setMaxHeight(0);
      return;
    }

    // 고정값 1000 대신, 콘텐츠의 실제 자식 요소 높이(scrollHeight)를 계산하여 
    // 불필요한 여백 계산으로 인한 애니메이션 딜레이를 없앱니다.
    setMaxHeight(visible ? ref.current.scrollHeight : 0);
  };

  useEffect(() => {
    requestAnimationFrame(handleHeight);
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`${
        visible ? "arcodion-content" : "arcodion-content-close"
      } overflow-hidden`}
      // transition 시간을 0.15초로 단축하여 클릭 시 계좌번호가 휙 빠르게 나타나도록 설정했습니다.
      style={{ 
        maxHeight, 
        transition: "max-height 0.15s ease-in-out" 
      }}
    >
      {children}
    </div>
  );
};

const Arrow = () => {
  const { visible } = useArcodion();

  return visible ? (
    <ArrowTop className="flex-none" />
  ) : (
    <ArrowBottom className="flex-none" />
  );
};

Arcodion.Header = Header;
Arcodion.Content = Content;
Arcodion.Arrow = Arrow;

Arcodion.displayName = "Arcodion";

export default Arcodion;
