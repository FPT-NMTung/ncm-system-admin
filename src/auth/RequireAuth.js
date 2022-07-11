import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  let location = useLocation();

  if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("refresh_token")
  ) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
