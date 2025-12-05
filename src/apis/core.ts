import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 공통 API 응답 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}

export default apiClient;
