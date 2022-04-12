const { Navigate, useLocation } = require("react-router-dom");

const RequireAuth = ({ children }) => {
  let location = useLocation();
  const encodedToken = localStorage.getItem("token");

  return encodedToken ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export { RequireAuth };
