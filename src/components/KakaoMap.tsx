import { useEffect } from "react";

import type { Place } from "@/types/kakaoMap";
import { Map, MapMarker, MapTypeControl } from "react-kakao-maps-sdk";

import { useGeoLocation } from "@/hooks/useGeoLocation";

interface KakaoMapProps {
  width?: string;
  height?: string;
  places: Place[];
  onMarkerClick: (place: Place) => void;
}

const KakaoMap = ({ width = "100%", height = "400px", places, onMarkerClick }: KakaoMapProps) => {
  const { location, isLoading, error } = useGeoLocation();

  const defaultCenter = { lat: 33.44997901075206, lng: 126.91819928968532 };

  const mapCenter = location ? { lat: location.latitude, lng: location.longitude } : defaultCenter;

  useEffect(() => {
    if (!window.kakao) {
      return;
    }
  }, [isLoading, location, error]);

  return (
    <Map center={mapCenter} level={3} style={{ width: width, height: height }}>
      <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />

      {/* 장소 배열 기반 마커 표시 */}
      {places.map(place => (
        <MapMarker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          title={place.name}
          onClick={() => onMarkerClick(place)}
        />
      ))}
    </Map>
  );
};

export default KakaoMap;
