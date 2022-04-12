import "./logout-page.css";
import { Link, useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="logout-flex logout-margin-top">
        <h2>You logged out successfully</h2>
        <div className="logout-flex logout-flex-direction">
          <p
            className="btn btn-primary text-lg cursor"
            onClick={() =>
              navigate("/signin", { state: { from: { pathname: "/" } } })
            }
          >
            Login
          </p>
          <Link className="btn btn-primary text-lg" to="/">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export { LogoutPage };
