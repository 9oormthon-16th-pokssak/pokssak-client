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
