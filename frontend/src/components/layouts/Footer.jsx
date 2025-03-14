import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All Rights Reserved &copy; Xo Tech</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>
        &nbsp;|&nbsp;
        <Link to="/contact">Contact</Link>
        &nbsp;|&nbsp;
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
