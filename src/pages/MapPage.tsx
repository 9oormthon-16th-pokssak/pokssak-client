import { useCallback, useEffect, useRef, useState } from "react";

import type { Place } from "@/types/kakaoMap";
import type { Spot } from "@/types/map";

import KakaoMap from "@/components/KakaoMap";
import Header from "@/components/common/Header";
import PlaceBottomSheet from "@/components/map/PlaceBottomSheet";
import RefreshButton from "@/components/map/RefreshButton";

import { searchSpots } from "@/apis/map";
import { PREFERENCES } from "@/constants/preferences";
import { useGeoLocation } from "@/hooks/useGeoLocation";

// 범위 정보 계산 함수 (현재 위치 기준으로 반경 km의 사각형 범위 계산)
const calculateBounds = (lat: number, lng: number, radiusKm: number = 5) => {
  // 1도 위도 ≈ 111km
  // 1도 경도 ≈ 111km * cos(위도)
  const latOffset = radiusKm / 111;
  const lngOffset = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));

  return {
    swLat: lat - latOffset, // 남서쪽 위도
    swLng: lng - lngOffset, // 남서쪽 경도
    neLat: lat + latOffset, // 북동쪽 위도
    neLng: lng + lngOffset, // 북동쪽 경도
  };
};

// Spot 타입을 Place 타입으로 변환
const convertSpotToPlace = (spot: Spot): Place => {
  return {
    id: spot.id,
    name: spot.name,
    lat: spot.location.latitude,
    lng: spot.location.longitude,
    address: spot.location.address,
  };
};

export default function MapPage() {
  // 1. 상태: 클릭된 장소 정보
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(undefined);
  // 2. 상태: 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 3. 상태: 선택된 취향 정보
  const [selectedPreference, setSelectedPreference] = useState<string>(PREFERENCES[0].label);
  // 4. 상태: 장소 목록
  const [places, setPlaces] = useState<Place[]>([]);
  // 5. 상태: RefreshButton 표시 여부
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  // 6. 상태: 마지막으로 API 호출한 범위
  const lastApiBoundsRef = useRef<{
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
  } | null>(null);

  // 지도 인스턴스 참조
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 현재 위치 정보 가져오기
  const { location, isLoading: isLocationLoading } = useGeoLocation();

  // 3. 핸들러: 마커 클릭 시 호출되는 함수
  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place); // 선택된 장소 상태 저장
    setIsModalOpen(true); // 모달 열기
  };

  // 지도 인스턴스 생성 시 호출
  const handleMapCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;
  };

  // 범위 비교 함수 (소수점 6자리까지 비교)
  const areBoundsEqual = (
    bounds1: { swLat: number; swLng: number; neLat: number; neLng: number },
    bounds2: { swLat: number; swLng: number; neLat: number; neLng: number }
  ) => {
    const precision = 1000000; // 소수점 6자리까지 비교
    return (
      Math.round(bounds1.swLat * precision) === Math.round(bounds2.swLat * precision) &&
      Math.round(bounds1.swLng * precision) === Math.round(bounds2.swLng * precision) &&
      Math.round(bounds1.neLat * precision) === Math.round(bounds2.neLat * precision) &&
      Math.round(bounds1.neLng * precision) === Math.round(bounds2.neLng * precision)
    );
  };

  // spots API 호출 함수
  const fetchSpots = useCallback(
    async (
      bounds: { swLat: number; swLng: number; neLat: number; neLng: number },
      hideButton = false
    ) => {
      try {
        // 취향 정보에서 value 값 가져오기 (예: "QUIET", "LOCAL" 등)
        const preferenceValue = PREFERENCES.find(p => p.label === selectedPreference)?.value || "";

        // API 호출
        const response = await searchSpots({
          keyword: preferenceValue,
          swLat: bounds.swLat,
          swLng: bounds.swLng,
          neLat: bounds.neLat,
          neLng: bounds.neLng,
        });

        // 응답 데이터를 Place 타입으로 변환
        if (response.success && response.data) {
          const convertedPlaces = response.data.list.map(convertSpotToPlace);
          setPlaces(convertedPlaces);
        }

        // 마지막 API 호출 범위 저장
        lastApiBoundsRef.current = bounds;

        // 버튼 숨기기
        if (hideButton) {
          setShowRefreshButton(false);
        }
      } catch (error) {
        console.error("spots API 호출 실패:", error);
      }
    },
    [selectedPreference]
  );

  // 지도 범위 변경 핸들러
  const handleBoundsChanged = useCallback(
    (bounds: { swLat: number; swLng: number; neLat: number; neLng: number }) => {
      // 마지막 API 호출 범위와 비교
      if (lastApiBoundsRef.current && areBoundsEqual(bounds, lastApiBoundsRef.current)) {
        // 범위가 같으면 버튼 숨김
        setShowRefreshButton(false);
      } else if (lastApiBoundsRef.current) {
        // 범위가 변경되었으면 버튼 표시
        setShowRefreshButton(true);
      }
    },
    []
  );

  // RefreshButton 클릭 핸들러: 현재 지도 범위 기준으로 API 호출
  const handleRefreshClick = () => {
    if (!mapRef.current) {
      console.warn("지도 인스턴스가 아직 생성되지 않았습니다.");
      return;
    }

    // 현재 지도의 범위 가져오기
    const bounds = mapRef.current.getBounds();
    const swLatLng = bounds.getSouthWest(); // 남서쪽 좌표
    const neLatLng = bounds.getNorthEast(); // 북동쪽 좌표

    const currentBounds = {
      swLat: swLatLng.getLat(),
      swLng: swLatLng.getLng(),
      neLat: neLatLng.getLat(),
      neLng: neLatLng.getLng(),
    };

    // 지도 범위를 기준으로 API 호출 (버튼 숨김)
    fetchSpots(currentBounds, true);
  };

  // 초기 spots API 호출 (현재 위치 기준)
  useEffect(() => {
    // 위치 정보가 로드되지 않았거나 위치가 없으면 API 호출하지 않음
    if (isLocationLoading || !location) {
      return;
    }

    // 범위 정보 계산
    const bounds = calculateBounds(location.latitude, location.longitude, 5);

    // API 호출 (초기 호출이므로 버튼 숨김)
    fetchSpots(bounds, true);
  }, [location, isLocationLoading, fetchSpots]);

  return (
    <div>
      <Header selectedPreference={selectedPreference} onPreferenceChange={setSelectedPreference} />
      {/* 1. KakaoMap 컴포넌트 */}
      <KakaoMap
        places={places}
        onMarkerClick={handleMarkerClick}
        onMapCreate={handleMapCreate}
        onBoundsChanged={handleBoundsChanged}
        height="100vh"
      />
      {showRefreshButton && <RefreshButton onClick={handleRefreshClick} />}

      {selectedPlace && (
        <PlaceBottomSheet
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedPlace={selectedPlace}
        />
      )}
    </div>
  );
}
