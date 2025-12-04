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
    // 위치 정보 요청 시작
    console.log("[위치정보 흐름] 위치 정보 요청을 시작합니다.");

    // 1. 브라우저의 Geolocation 지원 여부
    if (!navigator.geolocation) {
      // 브라우저 미지원
      const notSupportedError = "사용하시는 브라우저에서 위치 정보를 지원하지 않습니다.";
      console.error("[위치정보 에러] 코드: N/A, 메시지: 브라우저 미지원.");
      setError(notSupportedError);
      setIsLoading(false);
      return;
    }

    // 2. 위치 가져오기 성공 콜백
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      // 위치 정보 성공
      console.log(
        `[위치정보 성공] 위치를 성공적으로 가져옴. 위도: ${latitude}, 경도: ${longitude}`
      );
      setLocation({
        latitude,
        longitude,
      });
      // 로딩 종료
      setIsLoading(false);
      console.log("[위치정보 흐름] 로딩 상태가 false로 설정되었습니다 (성공).");
    };

    // 3. 위치 가져오기 실패 콜백
    const handleError = (error: GeolocationPositionError) => {
      let errorMessage: string;
      const errorCode = error.code;

      // Geolocation 에러 코드 확인 및 상세 메시지 설정
      switch (errorCode) {
        case error.PERMISSION_DENIED:
          // 1: 권한 거부
          errorMessage = "사용자가 위치 정보 접근 권한을 거부했습니다.";
          break;
        case error.POSITION_UNAVAILABLE:
          // 2: 위치 정보 사용 불가
          errorMessage = "사용 가능한 위치 정보 소스를 찾을 수 없습니다.";
          break;
        case error.TIMEOUT:
          // 3: 타임아웃
          errorMessage = `위치 정보를 가져오는 요청이 시간 초과되었습니다. (설정 시간: 5000ms 초과)`;
          break;
        default:
          // 알 수 없는 에러 (TS2339 해결)
          errorMessage = `알 수 없는 에러가 발생했습니다: ${error.message}`;
          break;
      }

      // 위치 정보 실패 및 에러 코드 기록
      console.error(`[위치정보 에러] 코드: ${errorCode}, 메시지: ${errorMessage}`);
      setError(errorMessage);
      // 로딩 종료
      setIsLoading(false);
      console.log("[위치정보 흐름] 로딩 상태가 false로 설정되었습니다 (에러).");
    };

    // 4. 위치 요청 옵션
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };
    console.log(
      `[위치정보 흐름] 옵션 설정 완료: 높은 정확도=${options.enableHighAccuracy}, 타임아웃=${options.timeout}ms, 최대 캐시 시간=${options.maximumAge}ms.`
    );

    // 5. 위치 정보 요청 실행
    console.log("[위치정보 흐름] navigator.geolocation.getCurrentPosition API를 호출합니다.");
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error, isLoading };
};
