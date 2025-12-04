import { useState } from "react";

import type { Place } from "@/types/kakaoMap";

import KakaoMap from "@/components/KakaoMap";
import BottomBar from "@/components/common/BottomBar";
import Header from "@/components/common/Header";
import PlaceBottomSheet from "@/components/map/PlaceBottomSheet";
import RefreshButton from "@/components/map/RefreshButton";

// 5개 장소 더미 데이터 (예시)
const examplePlaces: Place[] = [
  {
    id: 1,
    name: "성산일출봉",
    lat: 33.449979,
    lng: 126.918199,
    address: "제주 서귀포시 성산읍 성산리 1",
  },
  {
    id: 2,
    name: "광치기 해변",
    lat: 33.456,
    lng: 126.923,
    address: "제주 서귀포시 성산읍 고성리 224-33",
  },
  {
    id: 3,
    name: "아쿠아플라넷 제주",
    lat: 33.466,
    lng: 126.913,
    address: "제주 서귀포시 성산읍 섭지코지로 1",
    phone: "064-780-0000",
  },
  { id: 4, name: "섭지코지", lat: 33.435, lng: 126.929, address: "제주 서귀포시 성산읍 고성리" },
  {
    id: 5,
    name: "성산포항",
    lat: 33.465,
    lng: 126.932,
    address: "제주 서귀포시 성산읍 성산등용로 130-22",
    phone: "064-782-5671",
  },
];

export default function MapPage() {
  // 1. 상태: 클릭된 장소 정보
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(undefined);
  // 2. 상태: 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. 핸들러: 마커 클릭 시 호출되는 함수
  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place); // 선택된 장소 상태 저장
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <div>
      <Header />
      {/* 1. KakaoMap 컴포넌트 */}
      <KakaoMap places={examplePlaces} onMarkerClick={handleMarkerClick} height="100vh" />
      <RefreshButton />

      {selectedPlace && (
        <PlaceBottomSheet
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedPlace={selectedPlace}
        />
      )}

      <BottomBar />
    </div>
  );
}
