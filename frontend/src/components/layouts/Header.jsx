import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import SearchInput from "../Form/SearchInput";
import { MdSpaceDashboard } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
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
          <Link to="/" className="navbar-brand text-white fw-bold">
            <GiShoppingBag className="me-2" />
            Ecommerce App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <SearchInput />
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/categories"
                  className="nav-link dropdown-toggle text-white"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link text-white">
                    Cart {cart?.length}
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
