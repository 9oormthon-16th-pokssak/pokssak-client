import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const UnauthenticatedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnauthenticatedRoute;
