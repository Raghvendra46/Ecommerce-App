import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import AdminMenu from "../../layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap" style={styles.cardContainer}>
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="product-link"
                style={styles.cardLink}
              >
                <div className="card" style={styles.card}>
                  <img
                    src={`http://localhost:3000/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={styles.cardImage}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  cardContainer: {
    justifyContent: "space-between",
  },
  cardLink: {
    flex: "1 0 calc(25% - 1rem)",
    margin: "0.5rem",
    textDecoration: "none",
  },
  card: {
    height: "300px",
    width: "100%",
    padding: "20px 0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardImage: {
    height: "150px",
    width: "100%",
    objectFit: "contain",
  },
};

export default Products;
