import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">&lt;/&gt;</span>
        <span>AI Code Reviewer</span>
      </Link>

      <div className="navbar-links">
        <Link
          to="/"
          className={isActive("/") ? "nav-active" : ""}
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className={isActive("/dashboard") ? "nav-active" : ""}
            >
              Dashboard
            </Link>

            <Link
              to="/history"
              className={isActive("/history") ? "nav-active" : ""}
            >
              History
            </Link>

            <button
              className="link-button logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={isActive("/login") ? "nav-active" : ""}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={`nav-register ${
                isActive("/register") ? "nav-register-active" : ""
              }`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}