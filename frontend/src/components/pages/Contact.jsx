import React from "react";
import Layout from "../layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="../../../public/images/contact.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we are
            available 24X7
          </p>
          <p className="mt-3">
            <BiMailSend /> :{" "}
            <a
              href="https://www.raystec.com"
              target="blank"
              style={{ textDecoration: "none" }}
              className="text-white"
            >
              {" "}
              Rays Technology
            </a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9669330519
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
