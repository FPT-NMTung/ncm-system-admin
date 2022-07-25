import { useLocation, Navigate } from "react-router-dom";

function NoRequireAuth({ children }) {
  let location = useLocation();

  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  return children;
}

export default NoRequireAuth;
