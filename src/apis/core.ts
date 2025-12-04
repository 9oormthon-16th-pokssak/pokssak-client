import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 공통 API 응답 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}

export default apiClient;
