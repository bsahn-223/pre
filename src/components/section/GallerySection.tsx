"use client";

import "swiper/css";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import FadeIn from "../FadeIn";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";

const getGalleryImageLoader = (number: number) => {
  return `/gallery/gallery_${number < 10 ? `0${number}` : number}.JPEG`;
};
const IMAGES = Array.from({ length: 11 }, (_, i) => ({
  url: getGalleryImageLoader(i + 1)
}));

const GallerySection = () => {
  const [selectedIndex, setSlectedIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass>();

  useEffect(() => {
    if (!sliderRef.current) return;

    const target = document.getElementById(`small-image-${selectedIndex}`);
    if (!target) return;
    const slider = sliderRef.current;

    const targetWidth = target.offsetWidth;
    const targetLeft = target.offsetLeft;
    const targetCenter = targetLeft + targetWidth / 2;

    const sliderWidth = slider.offsetWidth;
    const sliderCenter = sliderWidth / 2;

    slider.scrollTo({
      left: targetCenter - sliderCenter,
      behavior: "smooth"
    });
  }, [selectedIndex]);

  const handleTransition = useCallback(() => {
    setTransitionIds((prev) => prev.concat(prev.length));
  }, []);

  const { isInView } = useIsInView(ref, handleTransition);

  const progressPercent = useMemo(
    () => ((selectedIndex + 1) / IMAGES.length) * 100,
    [selectedIndex]
  );

  return (
    <>
      <section ref={ref} id="gallery-section" className="w-full flex flex-col items-center">
        <SlideUp className="w-full max-w-400pxr mx-auto px-24pxr" show={transitionIds.includes(0)}>
          <Title>GALLERY</Title>
        </SlideUp>

        <Spacing size={10} />

        <FadeIn show={isInView} className="w-full flex flex-col items-center">
          
          {/* 1. 큰 이미지 스와이퍼 영역 */}
          <div className="w-full max-w-400pxr mx-auto px-24pxr">
            <Swiper
              loop
              initialSlide={selectedIndex}
              slidesPerView={1}
              onSlideChange={(slider) => setSlectedIndex(slider.realIndex)}
              onSwiper={(swiper) => setSwiper(swiper)}
              // [수정] Swiper 자체와 내부 wrapper 컴포넌트까지 세로 정렬이 먹히도록 스타일을 지정합니다.
              style={{ 
                display: "flex", 
                alignItems: "center", 
                height: "500px" // 가장 긴 세로 사진 기준 높이를 명시적으로 확보합니다.
              }}
            >
              {IMAGES.map((image, index) => (
                <SwiperSlide 
                  key={index} 
                  // [수정] !important 역할을 하는 스타일 주입으로 가로형 사진이 상단으로 붙는 현상을 완전히 방지합니다.
                  className="flex justify-center items-center"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
                >
                  <img
                    // max-h를 컨테이너 높이(500px)와 일치시켜 가로/세로 사진 모두 정중앙에 갇히도록 처리했습니다.
                    className="w-full max-h-[500px] object-contain mx-auto"
                    alt="selected-image"
                    src={image.url}
                    width={764}
                    height={1146}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <Spacing size={16} />
          
          {/* 2. 프로그레스 바 정중앙 고정 */}
          <div className="w-full max-w-400pxr mx-auto px-24pxr">
            <ProgressBar width={`${progressPercent}%`} />
          </div>

          <Spacing size={16} />
          
          {/* 3. 하단 썸네일 리스트 */}
          <div
            ref={sliderRef}
            className="w-full max-w-400pxr mx-auto flex flex-row flex-nowrap gap-4pxr overflow-x-auto justify-start items-center px-24pxr min-h-95pxr"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {IMAGES.map((image, index) => (
              <div
                id={`small-image-${index}`}
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  swiper?.slideToLoop(index);
                }}
                className="relative cursor-pointer w-60pxr h-90pxr flex-none"
              >
                <Image
                  quality={100}
                  loading="lazy"
                  alt="preview"
                  src={image.url}
                  className="object-cover w-full h-full"
                  width={120}
                  height={180}
                />
                <div
                  className="w-full h-full absolute left-0 top-0"
                  style={
                    index === selectedIndex
                      ? { boxShadow: `0 0 0 2px #000 inset` }
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
};

export default GallerySection;
