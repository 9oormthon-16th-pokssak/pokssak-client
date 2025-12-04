import { useEffect } from "react";

import type { Place } from "@/types/kakaoMap";
import { Map, MapMarker, MapTypeControl } from "react-kakao-maps-sdk";

import { useGeoLocation } from "@/hooks/useGeoLocation";

import myLocationMarker from "@/assets/my-location-marker.svg";

interface KakaoMapProps {
  width?: string;
  height?: string;
  places: Place[];
  onMarkerClick: (place: Place) => void;
  onMapCreate?: (map: kakao.maps.Map) => void;
  onBoundsChanged?: (bounds: {
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
  }) => void;
}

const KakaoMap = ({
  width = "100%",
  height = "400px",
  places,
  onMarkerClick,
  onMapCreate,
  onBoundsChanged,
}: KakaoMapProps) => {
  const { location, isLoading, error } = useGeoLocation();

  const defaultCenter = { lat: 33.44997901075206, lng: 126.91819928968532 };

  const mapCenter = location ? { lat: location.latitude, lng: location.longitude } : defaultCenter;

  useEffect(() => {
    if (!window.kakao) {
      return;
    }
  }, [isLoading, location, error]);

  const handleMapCreate = (map: kakao.maps.Map) => {
    if (onMapCreate) {
      onMapCreate(map);
    }
  };

  const handleBoundsChanged = (map: kakao.maps.Map) => {
    if (onBoundsChanged) {
      const bounds = map.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();

      onBoundsChanged({
        swLat: swLatLng.getLat(),
        swLng: swLatLng.getLng(),
        neLat: neLatLng.getLat(),
        neLng: neLatLng.getLng(),
      });
    }
  };

  return (
    <Map
      center={mapCenter}
      level={3}
      style={{ width: width, height: height }}
      onCreate={handleMapCreate}
      onBoundsChanged={handleBoundsChanged}
    >
      <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />

      {/* 현위치 마커 */}
      {location && (
        <MapMarker
          position={{ lat: location.latitude, lng: location.longitude }}
          image={{
            src: myLocationMarker,
            size: { width: 24, height: 24 },
          }}
          zIndex={1000}
        />
      )}

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
