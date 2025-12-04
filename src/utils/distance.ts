/** 지구 평균 반지름 (미터) */
const R_EARTH_METERS: number = 6371000.0;

/** 도를 라디안으로 변환 */
const toRadians = (degrees: number): number => {
  // 라디안 변환
  return degrees * (Math.PI / 180);
};

/**
 * 두 지점 간 거리 계산 함수 (미터)
 */
export function haversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // 라디안 변환
  const lat1Rad: number = toRadians(lat1);
  const lat2Rad: number = toRadians(lat2);
  const dLat: number = toRadians(lat2 - lat1);
  const dLon: number = toRadians(lon2 - lon1);

  // 하버사인 공식 'a'
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  // 중심각 'c'
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 최종 거리 (미터)
  const distance: number = R_EARTH_METERS * c;

  return distance;
}
