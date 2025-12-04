import { useAuth } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const UnauthenticatedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnauthenticatedRoute;
