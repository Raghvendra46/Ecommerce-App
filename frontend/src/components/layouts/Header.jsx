import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successful");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(to right, #000428, #004e92)",
          color: "#fff",
        }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            Ecommerce App
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/category"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  Category
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/signUp" className="nav-link text-white">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-white">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle text-white"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {auth.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <MdSpaceDashboard /> Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <MdOutlineLogout /> Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link text-white">
                  <Badge count={cart?.length} showZero className="text-white">
                    Cart {`(${cart?.length})`}
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
