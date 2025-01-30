import React from "react";
import Layout from "../../layouts/Layout";
import AdminMenu from "../../layouts/AdminMenu";

const Products = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Products</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
