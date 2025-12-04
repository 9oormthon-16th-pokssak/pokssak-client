import { useAuth } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const RegisteredRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

export default RegisteredRoute;
