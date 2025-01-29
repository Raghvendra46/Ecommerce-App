import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../../layouts/Layout";
import "../../../styles/AuthStyles.css";
import { useAuth } from "../../../context/Auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );

      if (res.data.success) {
        toast.success("User Login Successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Login Credentials");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <Link to="/signUp" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
          <div align="center" className="mt-3">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
