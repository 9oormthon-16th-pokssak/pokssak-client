// API 응답용 장소 위치 정보 타입
export interface SpotLocation {
  latitude: number;
  longitude: number;
  address: string;
}

// API 응답용 장소 정보 타입
export interface Spot {
  id: number;
  keyword: string;
  name: string;
  description: string;
  location: SpotLocation;
  mapLink: string;
  tip: string;
  weight: number;
}

// 장소 검색 응답 데이터 타입
export interface SearchSpotsResponse {
  list: Spot[];
}

export interface SpotDetailResponse {
  id: number;
  keyword: string;
  name: string;
  description: string;
  location: SpotLocation;
  mapLink: string;
  tip: string;
  tags: string[];
  weight: number;
  isLiked: boolean;
  isVisited: boolean;
}
