import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../../layouts/Layout";
import "../../../styles/AuthStyles.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUp = async(e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signUp",
        formData
      );
      console.log("data => ", res.data);

      if (res.data.success) {
        toast.success("User Registered Successfully, Please Login");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>User Registration</h1>
        <form onSubmit={signUp}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Your Name"
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Address"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="form-control"
              placeholder="What is your Favorite Sport?"
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
