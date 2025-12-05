import type { SearchSpotsResponse, Spot } from "@/types/map";

import apiClient, { type ApiResponse } from "./core";

export const getLikedSpots = async (): Promise<ApiResponse<Spot[]>> => {
  const response = await apiClient.get<ApiResponse<Spot[]>>("/spots/likes");
  return response.data;
};

export const getVisitedSpots = async (): Promise<ApiResponse<Spot[]>> => {
  const response = await apiClient.get<ApiResponse<Spot[]>>("/spots/visits");
  return response.data;
};

export const getRecommendedSpots = async (): Promise<ApiResponse<SearchSpotsResponse>> => {
  const response = await apiClient.post<ApiResponse<SearchSpotsResponse>>("/spots/recommend");
  return response.data;
};
