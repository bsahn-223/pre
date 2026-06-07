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
        {/* 타이틀 중앙 정렬을 위해 mx-auto 추가 */}
        <SlideUp className="w-full max-w-400pxr mx-auto px-24pxr" show={transitionIds.includes(0)}>
          <Title>GALLERY</Title>
        </SlideUp>

        <Spacing size={10} />

        {/* FadeIn 내부의 전체 레이아웃 흐름을 중앙 정렬로 설정 */}
        <FadeIn show={isInView} className="w-full flex flex-col items-center">
          
          {/* 1. 큰 이미지 스와이퍼 영역 (정중앙 정렬 및 내부 이미지 정렬) */}
          <div className="w-full max-w-400pxr mx-auto px-24pxr">
            <Swiper
              loop
              initialSlide={selectedIndex}
              slidesPerView={1}
              onSlideChange={(slider) => setSlectedIndex(slider.realIndex)}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {IMAGES.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center">
                  <img
                    className="w-full object-contain mx-auto"
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
          
          {/* 3. 하단 썸네일 리스트 중앙 정렬 */}
          {/* max-w 고정 및 mx-auto를 부여하고, 이미지 수가 적을 때도 중앙 정렬되도록 justify-start regular:justify-center 추가 */}
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
