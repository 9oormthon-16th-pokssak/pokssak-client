import { create } from "zustand";

interface User {
  name?: string;
  keyword?: string;
  // TODO: 서버에서 받을 추가 필드들
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

const USER_STORAGE_KEY = "user";

// localStorage에서 유저 정보 복원
const getInitialUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  return null;
};

const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>(set => ({
  user: initialUser,
  isAuthenticated: initialUser !== null,
  setUser: newUser => {
    if (newUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    set({
      user: newUser,
      isAuthenticated: newUser !== null,
    });
  },
}));
