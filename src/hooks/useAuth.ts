import { useAuthStore } from "@/stores/authStore";

export const useAuth = () => {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setUser = useAuthStore(state => state.setUser);

  return {
    user,
    isAuthenticated,
    setUser,
  };
};
