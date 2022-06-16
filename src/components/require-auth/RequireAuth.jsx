const { Navigate, useLocation, Outlet } = require("react-router-dom");

const RequireAuth = () => {
  const location = useLocation();
  const encodedToken = localStorage.getItem("token");

  return encodedToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export { RequireAuth };
