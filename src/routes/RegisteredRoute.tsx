import { Outlet } from "react-router-dom";

// import { useAuth } from "@/hooks/useAuth";

const RegisteredRoute = () => {
  // const { isAuthenticated } = useAuth();
  //
  // if (!isAuthenticated) {
  //   return <Navigate to="/signup" replace />;
  // }

  return <Outlet />;
};

export default RegisteredRoute;
