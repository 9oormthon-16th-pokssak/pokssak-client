import type { SearchSpotsResponse, SpotDetailResponse } from "@/types/map";

import apiClient, { type ApiResponse } from "./core";

interface SearchSpotsRequest {
  keyword: string;
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

export const searchSpots = async (
  params: SearchSpotsRequest
): Promise<ApiResponse<SearchSpotsResponse>> => {
  const { keyword, swLat, swLng, neLat, neLng } = params;

  // 쿼리 파라미터 구성
  const queryParams = new URLSearchParams({
    keyword,
    swLat: swLat.toString(),
    swLng: swLng.toString(),
    neLat: neLat.toString(),
    neLng: neLng.toString(),
  });

  const response = await apiClient.get<ApiResponse<SearchSpotsResponse>>(
    `/spots?${queryParams.toString()}`
  );
  return response.data;
};

interface GetSpotDetailRequest {
  spotId: number;
}

export const getSpotDetail = async (
  params: GetSpotDetailRequest
): Promise<ApiResponse<SpotDetailResponse>> => {
  const { spotId } = params;

  const response = await apiClient.get<ApiResponse<SpotDetailResponse>>(`/spots/${spotId}`);

  return response.data;
};

// 요청 타입은 동일합니다.
export interface SpotIdRequest {
  spotId: number; // 장소 ID
}

// 최종적으로 함수가 반환하고자 하는 실제 응답 데이터 (서버 응답 바디)
export interface SimpleMessageResponse {
  message: string; // 응답 메시지 (200 OK 시의 실제 데이터)
}

// 장소 좋아요 API 연동
export const likeSpot = async (params: SpotIdRequest): Promise<SimpleMessageResponse> => {
  // 장소 좋아요
  const { spotId } = params;

  const response = await apiClient.post<SimpleMessageResponse>(`/users/spot/like/${spotId}`);

  return response.data; // 좋아요 결과
};

// 장소 좋아요 취소 API 연동
export const unlikeSpot = async (params: SpotIdRequest): Promise<SimpleMessageResponse> => {
  // 좋아요 취소
  const { spotId } = params;

  const response = await apiClient.delete<SimpleMessageResponse>(`/users/spot/like/${spotId}`);

  return response.data; // 취소 결과
};

// 장소 방문 API 연동
export const visitSpot = async (params: SpotIdRequest): Promise<SimpleMessageResponse> => {
  // 장소 방문
  const { spotId } = params;

  const response = await apiClient.post<SimpleMessageResponse>(`/users/spot/visit/${spotId}`);

  return response.data; // 방문 기록
};
