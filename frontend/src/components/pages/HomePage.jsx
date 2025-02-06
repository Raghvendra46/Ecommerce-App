import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { useAuth } from "../../context/Auth";
import { Checkbox, Radio } from "antd";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const cardImageStyle = {
    height: "200px",
    objectFit: "contain",
    backgroundColor: "#f8f8f8",
    padding: "10px",
  };

  const filterSectionStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    background: "linear-gradient(to bottom, #333, #000)",
    marginBottom: "15px",
    minHeight: "200px",
    textAlign: "left",
    width: "90%",
    color: "#fff",
  };

  const filterHeaderStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: "10px",
  };

  const checkboxContainer = {
    display: "flex",
    alignItems: "center",
    marginLeft: "0",
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" container-fluid row mt-3 homepage">
        <div className="col-md-3">
          <div style={filterSectionStyle}>
            {/* <h4 style={filterHeaderStyle}>Filter By Price</h4>
            <div>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Price?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>
                      <span style={{ color: "#fff" }}>{p.name}</span>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div> */}
            <div style={filterSectionStyle}>
              <h4 style={filterHeaderStyle}>Filter By Category</h4>
              <div
                className="
              d-flex flex-column"
              >
                {categories?.map((c) => (
                  <div style={checkboxContainer} key={c._id}>
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      <span style={{ color: "#fff" }}>{c.name}</span>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`http://localhost:3000/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={cardImageStyle}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h6 className="card-title">{p.name}</h6>
                    <span className="card-title">
                      <span className="a-price-symbol"></span>
                      <span className="a-price-whole"></span>
                    </span>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 10)}...
                  </p>
                  <div className="card-name-price">
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add To Card
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
