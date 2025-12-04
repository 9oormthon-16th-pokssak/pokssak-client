import React from "react";

import { Drawer } from "vaul";

interface PlaceDetail {
  id: number | string;
  name: string;
  address: string;
  phone?: string;
}

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  subtitle?: string;
  selectedPlace?: PlaceDetail; // 클릭된 장소 정보
}

export default function CommonBottomModal({
  children,
  isOpen,
  setIsOpen,
  title,
  subtitle,
  selectedPlace,
}: Props) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />

        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-[9999] mx-auto mt-24 flex max-h-[80vh] flex-col rounded-t-[10px] bg-white md:max-w-[50vw]">
          {/* 스와이프 핸들 */}
          <div className="mx-auto my-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />

          {/* 모달 헤더 */}
          <div className="mb-3 flex w-full flex-shrink-0 flex-col items-center gap-3 text-center break-keep whitespace-pre-wrap text-[#1c408c]">
            <div className="title-area">
              <h2 className="m-0 text-2xl">{title}</h2>
              {subtitle && <span className="text-sm">{subtitle}</span>}
            </div>

            {/* 장소 상세 정보 표시 */}
            {selectedPlace && (
              <div className="mt-2 w-full px-4 text-gray-700">
                <h3 className="text-xl font-bold text-black">{selectedPlace.name}</h3>
                <p className="mt-1 text-sm">{selectedPlace.address}</p>
                {selectedPlace.phone && <p className="mt-1 text-sm">📞 {selectedPlace.phone}</p>}
              </div>
            )}
          </div>

          {/* 스크롤 가능한 내용 영역 */}
          <div className="flex-1 overflow-y-auto [&_img]:w-full [&_img]:max-w-[400px]">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
