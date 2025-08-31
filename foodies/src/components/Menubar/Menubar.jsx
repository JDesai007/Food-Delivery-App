import React, { useContext, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Menubar = () => {
  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities, user = null } =
    useContext(StoreContext);

  const uniqueItemsInCart = token
    ? Object.values(quantities).filter((qty) => qty > 0).length
    : 0;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        {/* Brand / Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="mx-4"
            height={80}
            width={80}
          />
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  active === "home" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "contact-us"
                    ? "nav-link fw-bold active"
                    : "nav-link"
                }
                to="/contact"
                onClick={() => setActive("contact-us")}
              >
                Contact us
              </Link>
            </li>
          </ul>

          {/* Right-side actions */}
          <div className="d-flex align-items-center gap-4">
            {/* Cart with item count - only visible if logged in */}
            {token && (
              <Link to={`/cart`}>
                <div className="position-relative">
                  <img
                    src={assets.cart}
                    alt="cart"
                    height={28}
                    width={28}
                    className="position-relative"
                  />
                  {uniqueItemsInCart > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                      {uniqueItemsInCart}
                    </span>
                  )}
                </div>
              </Link>
            )}

            {/* Profile / Auth */}
            {!token ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-flex align-items-center text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Profile Icon only */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #ff7eb3 0%, #6a11cb 50%, #2575fc 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px",
                      boxShadow: "0 0 8px rgba(106, 17, 203, 0.6)",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="bi bi-person-fill"
                      style={{ color: "white", fontSize: "24px" }}
                    ></i>
                  </div>
                </a>
                <ul className="dropdown-menu text-small shadow">
                  <li
                    className="dropdown-item"
                    onClick={() => navigate("/myorders")}
                  >
                    <i className="bi bi-bag-check me-2"></i> Orders
                  </li>
                  <li
                    className="dropdown-item text-danger fw-bold"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
