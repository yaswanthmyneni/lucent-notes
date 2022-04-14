import "./navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const encodedToken = localStorage.getItem("token");
  const [logout, setLogout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (logout) {
      window.location.reload();
    }
  }, [logout]);

  return (
    <header className="header">
      <div className="navbar-container">
        <NavLink className="navbar" to="/">
          <h1 className="navbar-m-lr-1">LUCENT NOTES</h1>
        </NavLink>
        {location.pathname === "/" && (
          <NavLink
            className="navbar navbar-m-left-auto"
            to="/notes"
            state={{ from: location }}
          >
            <h5 className="navbar-m-lr-1">NOTES</h5>
          </NavLink>
        )}
        {encodedToken && (
          <NavLink
            className={`navbar ${
              location.pathname === "/" ? "" : "navbar-m-left-auto"
            }`}
            to="/logout"
            onClick={() => {
              setLogout(true);
              localStorage.clear();
            }}
          >
            <h5 className="navbar-m-lr-1">LOGOUT</h5>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export { Navigation };
