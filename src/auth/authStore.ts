import { create } from "zustand";

interface User {
  name?: string;
  email?: string;
  // TODO: 서버에서 받을 추가 필드들
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

const USER_STORAGE_KEY = "user";

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
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
