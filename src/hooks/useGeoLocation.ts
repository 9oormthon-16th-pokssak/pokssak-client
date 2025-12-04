import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. 브라우저가 Geolocation을 지원하는지 확인
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    // 2. 성공 시 실행될 콜백
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      console.log("위치를 가져오기 성공 ...", latitude, longitude);
      setLocation({
        latitude,
        longitude,
      });
      setIsLoading(false);
    };

    // 3. 실패 시 실행될 콜백
    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      setIsLoading(false);
    };

    // 4. 옵션 설정 (정확도 등)
    const options: PositionOptions = {
      enableHighAccuracy: true, // 배터리를 더 소모하지만, 더 정확한 위치(GPS)를 요청
      timeout: 5000, // 위치 정보를 가져오는 데 기다릴 최대 시간 (ms)
      maximumAge: 0, // 캐시된 위치 정보를 사용하지 않고 매번 새 위치를 요청
    };

    // 5. 위치 정보 요청
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error, isLoading };
};
