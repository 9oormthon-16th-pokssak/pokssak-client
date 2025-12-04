import apiClient, { type ApiResponse } from "./core";

interface SignupRequest {
  name: string;
  keyword: string;
}

interface SignupData {
  accessToken: string;
  refreshToken: string;
}

export const signup = async (data: SignupRequest): Promise<ApiResponse<SignupData>> => {
  const response = await apiClient.post<ApiResponse<SignupData>>("/v2/signup", data);
  return response.data;
};
