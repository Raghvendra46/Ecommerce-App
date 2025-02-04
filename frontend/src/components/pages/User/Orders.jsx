import React from "react";
import Layout from "../../layouts/Layout";
import UserMenu from "../../layouts/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <div className="p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
