import { useEffect, useRef, useState } from "react";

import { Box, HStack } from "@vapor-ui/core";
import { useNavigate } from "react-router-dom";

interface CarouselProps {
  items: Array<{ id: string | number; image: string; alt?: string }>;
  autoPlayInterval?: number;
  className?: string;
  aspectRatio?: number; // 예: 16/9 = 1.778, 4/3 = 1.333, 기본값은 16/9
}

const Carousel = ({
  items,
  autoPlayInterval = 2000,
  className = "",
  aspectRatio = 16 / 9,
}: CarouselProps) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 자동 재생
  useEffect(() => {
    if (isDragging) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items.length, autoPlayInterval, isDragging]);

  // 마우스/터치 시작
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // 마우스/터치 이동
  const handleMove = (clientX: number) => {
    if (!isDragging) {
      return;
    }

    const diff = clientX - startX;
    setTranslateX(diff);
  };

  // 마우스/터치 종료
  const handleEnd = () => {
    if (!isDragging) {
      return;
    }

    const threshold = 50; // 슬라이드 전환을 위한 최소 이동 거리

    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        // 오른쪽으로 드래그 (이전 슬라이드)
        setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
      } else {
        // 왼쪽으로 드래그 (다음 슬라이드)
        setCurrentIndex(prev => (prev + 1) % items.length);
      }
    }

    setTranslateX(0);
    setIsDragging(false);
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {
      return;
    }
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 인디케이터 클릭
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Box className={`relative w-full overflow-hidden ${className}`}>
      {/* 캐러셀 컨테이너 */}
      <Box
        ref={carouselRef}
        className="relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <Box
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          }}
        >
          {items.map(item => (
            <Box
              key={item.id}
              className="min-w-full flex-shrink-0"
              onClick={() => {
                navigate(`/qlation/${item.id}`);
              }}
            >
              <div
                className="rounded-v-400 relative h-0 w-full overflow-hidden"
                style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
              >
                <img
                  src={item.image}
                  alt={item.alt || `Carousel item ${item.id}`}
                  className="rounded-v-400 absolute top-0 left-0 h-full w-full overflow-hidden object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 인디케이터 */}
      <HStack className="mt-v-100 justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleIndicatorClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-v-blue-400 w-8" : "bg-v-gray-200 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default Carousel;
