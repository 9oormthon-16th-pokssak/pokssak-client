import { type ReactNode, useEffect } from "react";

import { useAuthStore } from "@/stores/authStore";

const USER_STORAGE_KEY = "user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    // TODO: 나중에 TanStack Query로 서버에서 유저 정보를 받아올 때 여기서 처리
    // 예: const { data } = useQuery({ queryKey: ['user'], queryFn: fetchUser });
    //     if (data) setUser(data);

    // 임시: localStorage에서 유저 정보 확인 (서버 연동 전까지)
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, [setUser]);

  return <>{children}</>;
};
